import type { Request, Response } from 'express';

import PingController from '~/controllers/ping';
import express from 'express';

const pingRouter = express.Router();

pingRouter.get('/', async (_req: Request, res: Response) => {
    const { ping } = new PingController();
    const response = await ping();
    res.json(response);
});
export default pingRouter;
