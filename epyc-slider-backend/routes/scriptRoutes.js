import express from "express";
import { upsertPageCustomCode } from "../controllers/upsertScripts.js";

const router = express.Router();
router.put("/pages/:pageId/upsertCustomCode", upsertPageCustomCode);

export default router;
