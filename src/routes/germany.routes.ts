import type { Request, Response, Router } from 'express';

import CasesRouter from './cases.routes';
import DeathsRouter from './deaths.routes';
import ErrorHandler from '~/handlers/error.handler';
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
        const { data } = await fetchInfo();
        throwSuccess({
            response: res,
            data,
        });
    } catch (error) {
        throwInternalError({ response: res, error });
    }
});
germanyRouter.use('/cases', CasesRouter);
germanyRouter.use('/deaths', DeathsRouter);
germanyRouter.use('/states', GermanyStatesRouter);

export default germanyRouter;
