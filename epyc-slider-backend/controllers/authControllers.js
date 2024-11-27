import { WebflowClient } from "webflow-api";
import { storeToken, getToken } from "../auth/token.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const scopes = [
  "sites:read",
  "sites:write",
  "pages:write",
  "pages:read",
  "custom_code:read",
  "custom_code:write",
];

export const handleRoot = async (req, res) => {
  try {
    const token = await getToken("user");

    if (!token) {
      console.log("No token found. Redirecting to auth screen...");
      return res.redirect("/auth");
    } else {
      console.log("Token found. Redirecting to frontend");
      return res.redirect("https://www.webflow.com/dashboard");
    }
  } catch (error) {
    console.error("Error handling token:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const startAuthFlow = async (req, res) => {
  try {
    const siteToken = process.env.SITE_TOKEN;
    if (siteToken) {
      await storeToken("user", siteToken);
      console.log("Site token found and stored.");
      return res.redirect("https://www.webflow.com/dashboard");
    } else {
      const publicUrl = process.env.REDIRECT_URL;
      const authorizeUrl = WebflowClient.authorizeURL({
        scope: scopes,
        clientId: process.env.WEBFLOW_CLIENT_ID,
        redirectUri: `${publicUrl}/auth/callback/`,
      });
      return res.redirect(authorizeUrl);
    }
  } catch (error) {
    console.error("Error starting auth flow:", error);
    res.status(500).send("Failed to start auth flow");
  }
};

export const handleAuthCallback = async (req, res) => {
  const { code } = req.query;
  console.log(code, "wad");
  if (!code) {
    return res.status(400).send("Authorization code is required");
  }

  try {
    const publicUrl = process.env.REDIRECT_RL;
    console.log("main env", JSON.stringify(publicUrl));
    console.log({
      id: process.env.WEBFLOW_CLIENT_ID,
      secret: process.env.WEBFLOW_CLIENT_SECRET,
    });
    const accessToken = await WebflowClient.getAccessToken({
      clientId: process.env.WEBFLOW_CLIENT_ID,
      clientSecret: process.env.WEBFLOW_CLIENT_SECRET,
      code: code,
      redirectUri: undefined,
    });

    await storeToken("user", accessToken);
    console.log("Access token obtained and stored. Redirecting to webflow...");
    return res.redirect("https://www.webflow.com/dashboard");
  } catch (error) {
    console.error("Error fetching access token:", error);
    return res.status(500).send("Failed to fetch access token");
  }
};
