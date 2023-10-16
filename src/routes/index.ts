import type { Request, Response, Router } from 'express';

import CasesRouter from './cases.routes';
import DeathsRouter from './deaths.routes';
import PingController from '~/controllers/ping';
import express from 'express';

const router: Router = express.Router();

router.get('/ping', async (_req: Request, res: Response) => {
    const { ping } = new PingController();
    const response = await ping();
    res.json(response);
});

router.use('/cases', CasesRouter);
router.use('/deaths', DeathsRouter);

export default router;
