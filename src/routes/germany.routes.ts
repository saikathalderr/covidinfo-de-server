import type { Request, Response, Router } from 'express';

import CasesRouter from './cases.routes';
import DeathsRouter from './deaths.routes';
import ErrorHandler from '~/handlers/error.handler';
import { GERMANY_INFO_FETCHED_SUCCESSFULLY } from '~/messages/success';
import GermanyController from '~/controllers/germany';
import SuccessHandler from '~/handlers/success.handler';
import express from 'express';

const router: Router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
    const { fetchInfo } = new GermanyController();
    const { throwInternalError } = new ErrorHandler();
    const { throwSuccess } = new SuccessHandler();
    try {
        const { germany } = await fetchInfo();
        const message = GERMANY_INFO_FETCHED_SUCCESSFULLY;
        throwSuccess({ response: res, message, data: germany });
    } catch (error) {
        throwInternalError({ response: res, error });
    }
});
router.use('/cases', CasesRouter);
router.use('/deaths', DeathsRouter);

export default router;
