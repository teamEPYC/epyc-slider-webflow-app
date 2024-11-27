import { getToken } from "../auth/token.js";
import { inlineScript } from "../constants.js";

export const upsertPageCustomCode = async (req, res) => {
  const pageId = req.params.pageId;
  const { selectedScript, version, siteId } = req.body;

  if (!pageId || !selectedScript || !version || !siteId) {
    return res.status(400).json({
      status: 400,
      message:
        "Missing required parameters: pageId, selectedScript, version, or siteId.",
    });
  }

  try {
    const authToken = await getToken("user");
    console.log("Auth token retrieved successfully.");
    console.log("TOKEN", authToken);

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
      console.error("Failed to fetch registered scripts.", {
        status: getRegisteredScriptsResponse.status,
        statusText: getRegisteredScriptsResponse.statusText,
      });
      return res.status(getRegisteredScriptsResponse.status).json({
        status: getRegisteredScriptsResponse.status,
        message: "Failed to fetch registered scripts.",
      });
    }

    const registeredScriptData = await getRegisteredScriptsResponse.json();
    const hasHeadlink = registeredScriptData.registeredScripts.some(
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
        return res.status(registerInlineScriptResponse.status).json({
          status: registerInlineScriptResponse.status,
          message: "Failed to register inline script.",
        });
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
      console.error("Failed to update custom code.", {
        status: updateCustomCodeResponse.status,
        statusText: updateCustomCodeResponse.statusText,
      });
      return res.status(updateCustomCodeResponse.status).json({
        status: updateCustomCodeResponse.status,
        message: "Failed to update custom code.",
      });
    }

    const responseBody = await updateCustomCodeResponse.json();

    console.log("Custom code updated successfully.");
    res.status(updateCustomCodeResponse.status).json({
      status: updateCustomCodeResponse.status,
      message: "Custom code updated successfully.",
      data: responseBody,
    });
  } catch (error) {
    console.error(
      "Error occurred while updating custom code:",
      error.message,
      error.stack
    );
    res.status(500).json({
      status: 500,
      message: "An unexpected error occurred.",
      error: error.message,
    });
  }
};
