import GermanyStatesController, { GermanyStatesQueryParams } from '~/controllers/states';
import type { Request, Response } from 'express';

import ErrorHandler from '~/handlers/error.handler';
import { GERMANY_STATES_FETCHED_SUCCESSFULLY } from '~/messages/success';
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
        const message = GERMANY_STATES_FETCHED_SUCCESSFULLY.replace(
            '{{state}}',
            state?.length ? `state:${state}` : 'States',
        );
        throwSuccess({
            response: res,
            message,
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
