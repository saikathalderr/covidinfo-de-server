import type { Request, Response, Router } from "express";

import PingController from "~/controllers/ping";
import express from "express";

const router: Router = express.Router();

router.get("/ping", async (_req: Request, res: Response) => {
  const response = await PingController.ping();
  res.json(response);
});

export default router;
