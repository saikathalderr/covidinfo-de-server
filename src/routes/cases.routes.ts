import CasesController, { CasesQueryParams } from '~/controllers/cases';
import type { Request, Response } from 'express';

import { CASES_FETCHED_SUCCESSFULLY } from '~/messages/success';
import ErrorHandler from '~/handlers/error.handler';
import type { Router } from 'express';
import SuccessHandler from '~/handlers/success.handler';
import express from 'express';

const casesRouter: Router = express.Router();

const { fetchCases } = new CasesController();
const { throwInternalError } = new ErrorHandler();
const { throwSuccess } = new SuccessHandler();

casesRouter.get('/', async (req: Request, res: Response) => {
    try {
        const { order, sort } = req.query as unknown as CasesQueryParams;
        const { cases } = await fetchCases({ order, sort });
        const message = CASES_FETCHED_SUCCESSFULLY;
        throwSuccess({ response: res, message, data: cases });
    } catch (error) {
        throwInternalError({ response: res, error });
    }
});

export default casesRouter;
