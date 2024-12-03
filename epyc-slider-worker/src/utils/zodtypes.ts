import { z, ZodArray } from "zod";

export const jwtPayload = z.object({
  userId: z.string(),
  siteId: z.string(),
});

export const verifyBody = z.object({
  selectedScript: z.string(),
  version: z.string(),
  JWT: z.string(),
});

export const verifyregisteredScrips = z.object({
  registeredScripts: z.array(z.object({ id: z.string() })),
});

export const verifySiteId = z.object({ siteIds: z.array(z.string()) });

export const verifyidToken = z.object({
  id: z.string(),
});
