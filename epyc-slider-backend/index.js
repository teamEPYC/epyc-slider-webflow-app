import express from "express";
import cors from "cors";
import path from "path";
import chalk from "chalk";
import { fileURLToPath } from "url";
import Table from "cli-table3";
import dotenv from "dotenv";

dotenv.config();
// Import Webflow Client Middleware
import webflowClientMiddleware from "./webflowClientMiddleware.js";

// Import Routes
import authRoutes from "./routes/authRoutes.js";
import scriptRoutes from "./routes/scriptRoutes.js";

// Setup App
const app = express();
const PORT = process.env.PORT || 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: "http://localhost:1337",
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", authRoutes);
app.use("/api/custom-code", webflowClientMiddleware, scriptRoutes);

const startServer = async () => {
  try {
    const ngrokUrl = process.env.REDIRECT_URL;
    console.log(process.env.REDIRECT_URL);

    const table = new Table({
      head: ["Location", "URL"],
      colWidths: [20, 80],
    });

    // Add URL information to the table
    table.push(
      ["Backend", `http://localhost:${PORT}`],
      ["Frontend", "http://localhost:1337"]
    );

    // If using an App, also add the Redirect URI to the table
    if (process.env.REDIRECT_URL) {
      table.push(["Redirect URI", `${ngrokUrl}/auth/callback`]);
    }

    // Console log the table
    console.log(table.toString());

    // If using an App, send a note to adjust the app's Redirect URI
    if (!process.env.SITE_TOKEN) {
      console.log(
        chalk.blue.inverse("\n\nNOTE:"),
        chalk.blue("Update your Redirect URI in your App Settings\n\n")
      );
    }

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server with ngrok:", error);
    process.exit(1);
  }
};

startServer();
