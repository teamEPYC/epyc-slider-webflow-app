import { Hono } from "hono";
import { getToken, storeToken } from "./token/token";
import { WebflowClient } from "webflow-api";
import { OauthScope } from "webflow-api/api";
import { jwt, sign, verify } from "hono/jwt";
import {
  jwtPayload,
  verifyBody,
  verifyidToken,
  verifyregisteredScrips,
  verifySiteId,
} from "./utils/zodtypes";
import { inlineScript } from "./constants";
import { JwtTokenInvalid } from "hono/utils/jwt/types";

import { cors } from "hono/cors";

const scopes: OauthScope | OauthScope[] = [
  "sites:read",
  "sites:write",
  "pages:write",
  "pages:read",
  "custom_code:read",
  "custom_code:write",
];
const app = new Hono<{ Bindings: Env }>();

app.use(
  cors({
    origin: ["https://localhost:1337"],
  })
);

app.get("/auth", async (c) => {
  try {
    const publicUrl = c.env.REDIRECT_URL;
    const authorizeUri = WebflowClient.authorizeURL({
      clientId: c.env.WEBFLOW_CLIENT_ID,
      scope: scopes,
      redirectUri: `${publicUrl}/callback`,
    });
    return c.redirect(authorizeUri);
  } catch (error) {
    console.log("Error", error);
    return c.text("Failed to start auth process", 500);
  }
});

app.get("/auth/callback", async (c) => {
  try {
    console.log("auth to callback block");
    const { code } = c.req.query();
    if (!code) {
      return c.text("Failed to authorize", {
        status: 500,
        statusText: "Code not found",
      });
    }
    const accessToken = await WebflowClient.getAccessToken({
      clientId: c.env.WEBFLOW_CLIENT_ID,
      clientSecret: c.env.WEBFLOW_CLIENT_SECRET,
      code: code,
    });
    const webflow = new WebflowClient({ accessToken });
    const client = await webflow.token.introspect();
    console.log(client, "client ");
    if (!client.authorization?.authorizedTo) {
      return c.text("User ID not found", {
        status: 400,
        statusText: "Bad Request",
      });
    }

    const authorizedTo = verifySiteId.parse(client.authorization?.authorizedTo);
    const siteId = authorizedTo.siteIds;

    await storeToken(siteId, accessToken, c.env.DB);

    console.log("Access token obtained and stored. Redirecting to webflow...");
    return c.redirect("https://www.webflow.com/dashboard");
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error creating an accesss token", error.message);
      return c.json({ message: "Server error :)" }, { status: 400 });
    }
  }
});

app.post("/auth/user", async (c) => {
  try {
    const { idToken, siteId } = await c.req.json();
    const accessToken = await getToken(siteId, c.env.DB);
    if (!accessToken) {
      return c.json({ message: "Please install the app" }, { status: 400 });
    }

    const idTokenResponse = await fetch(
      "https://api.webflow.com/beta/token/resolve",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: idToken,
        }),
      }
    );
    const body = await idTokenResponse.json();
    const verifiedUser = verifyidToken.parse(body);
    const payload = {
      siteId: siteId.toString(),
      userId: verifiedUser.id.toString(),
      exp: Math.floor(Date.now() / 1000) + 3600 * 24,
    };
    const token = await sign(payload, c.env.JWT_SECRET);

    console.log(token, "token token");
    return c.json({ token }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return c.json(
        { message: "error in creating token", error: error.message },
        { status: 500 }
      );
    }
  }
});

app.put("/pages/:pageId/upsertCode", async (c) => {
  try {
    const pageId = c.req.param("pageId");
    const body = await c.req.json();
    const parsedBody = verifyBody.parse(body);
    const { selectedScript, JWT, version } = parsedBody;
    if (!pageId || !selectedScript || !version || !JWT) {
      return c.json(
        {
          message:
            "Missing required parameters: pageId, selectedScript, version, or JWT.",
        },
        { status: 400 }
      );
    }
    console.log(c.env.JWT_SECRET, "secret");
    console.log(JWT, "jwt");
    const userJWT = await verify(JWT, c.env.JWT_SECRET);
    if (!userJWT) {
      return c.json(
        { message: "JWT verification failed, please try again" },
        { status: 400 }
      );
    }
    const verifiedPayload = jwtPayload.parse(userJWT);

    const siteId = verifiedPayload.siteId;
    console.log(siteId, "site id ");
    const authToken = await getToken(siteId, c.env.DB);
    const getRegisteredScriptsResponse = await fetch(
      `https://api.webflow.com/v2/sites/${siteId}/registered_scripts`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (!getRegisteredScriptsResponse.ok) {
      return c.json(
        { message: "Failed to fetch registered scripts." },
        { status: getRegisteredScriptsResponse.status }
      );
    }

    const registeredScriptData = await getRegisteredScriptsResponse.json();
    const verifiedScriptData =
      verifyregisteredScrips.parse(registeredScriptData);
    const hasHeadlink = verifiedScriptData.registeredScripts.some(
      (script) => script.id === "headerlink"
    );

    if (!hasHeadlink) {
      console.log('Registering "headlink" inline script.');
      const registerInlineScriptResponse = await fetch(
        `https://api.webflow.com/v2/sites/${siteId}/registered_scripts/inline`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sourceCode: inlineScript,
            version: "0.0.1",
            displayName: "headerlink",
          }),
        }
      );

      if (!registerInlineScriptResponse.ok) {
        console.error("Failed to register inline script.", {
          status: registerInlineScriptResponse.status,
          statusText: registerInlineScriptResponse.statusText,
        });
        return c.json(
          {
            message: "Failed to register inline script.",
          },
          { status: registerInlineScriptResponse.status }
        );
      }

      console.log('Successfully registered "headlink" inline script.');
    }

    const updateCustomCodeResponse = await fetch(
      `https://api.webflow.com/v2/pages/${pageId}/custom_code`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          scripts: [
            {
              id: selectedScript,
              location: "header",
              version,
            },
          ],
        }),
      }
    );

    if (!updateCustomCodeResponse.ok) {
      return c.json(
        {
          message: "Failed to update custom code.",
        },
        { status: updateCustomCodeResponse.status }
      );
    }

    const responseBody = await updateCustomCodeResponse.json();

    console.log("Custom code updated successfully.");
    return c.json(
      {
        status: updateCustomCodeResponse.status,
        message: "Custom code updated successfully.",
        data: responseBody,
      },
      { status: updateCustomCodeResponse.status }
    );
  } catch (error) {
    if (error instanceof JwtTokenInvalid) {
      console.log("Invalid JWT token");
      return c.json({ message: "Token invalid" }, { status: 500 });
    }
    console.log("server side error", error);
    return c.json(
      { message: "Some server error happened ples try again", error: error },
      { status: 500 }
    );
  }
});
export default app;
