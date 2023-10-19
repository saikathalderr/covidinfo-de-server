import type { Request, Response } from 'express';

import ErrorHandler from '~/handlers/error.handler';
import GermanyStatesController from '~/controllers/states';
import { GermanyStatesQueryParams } from '~/interfaces/states.interface';
import SuccessHandler from '~/handlers/success.handler';
import express from 'express';

const germanyStatesRouter = express.Router();

germanyStatesRouter.get('/', async (req: Request, res: Response) => {
    const { throwInternalError } = new ErrorHandler();
    const { throwSuccess } = new SuccessHandler();
    const { fetchStates } = new GermanyStatesController();
    try {
        const { state } = req.query as unknown as GermanyStatesQueryParams;
        const { data } = await fetchStates({ state });
        throwSuccess({
            response: res,
            data,
        });
    } catch (error) {
        throwInternalError({
            error,
            response: res,
        });
    }
});

germanyStatesRouter.get('/cases', async (req: Request, res: Response) => {
    const { throwInternalError } = new ErrorHandler();
    const { throwSuccess } = new SuccessHandler();
    const { fetchStatesCasesHistory } = new GermanyStatesController();
    try {
        const { state } = req.query as unknown as GermanyStatesQueryParams;
        const { data } = await fetchStatesCasesHistory({ state });
        throwSuccess({
            response: res,
            data,
        });
    } catch (error) {
        throwInternalError({
            error,
            response: res,
        });
    }
});

export default germanyStatesRouter;
