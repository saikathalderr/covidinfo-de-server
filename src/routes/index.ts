import type { Request, Response, Router } from 'express';

import CasesRouter from './cases.routes';
import DeathsRouter from './deaths.routes';
import PingController from '~/controllers/ping';
import config from 'config';
import express from 'express';
import { rateLimit } from 'express-rate-limit';

const router: Router = express.Router();

const _rateLimitWindowMs: number = Number(config.get('RATE_LIMIT.WINDOW_MS')) || 1000;
const _rateLimitMax: number = Number(config.get('RATE_LIMIT.MAX_LIMIT')) || 5;

const limiter = rateLimit({
    windowMs: _rateLimitWindowMs,
    max: _rateLimitMax,
    standardHeaders: 'draft-7',
    legacyHeaders: true,
});

router.get('/ping', limiter, async (_req: Request, res: Response) => {
    const { ping } = new PingController();
    const response = await ping();
    res.json(response);
});

router.use('/cases', limiter, CasesRouter);
router.use('/deaths', limiter, DeathsRouter);

export default router;
