import type { Request, Response, Router } from 'express';

import CasesRouter from './cases.routes';
import DeathsRouter from './deaths.routes';
import ErrorHandler from '~/handlers/error.handler';
import { GERMANY_INFO_FETCHED_SUCCESSFULLY } from '~/messages/success';
import GermanyController from '~/controllers/germany';
import GermanyStatesRouter from './states.routes';
import SuccessHandler from '~/handlers/success.handler';
import express from 'express';

const germanyRouter: Router = express.Router();

germanyRouter.get('/', async (_req: Request, res: Response) => {
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
germanyRouter.use('/cases', CasesRouter);
germanyRouter.use('/deaths', DeathsRouter);
germanyRouter.use('/states', GermanyStatesRouter);

export default germanyRouter;
