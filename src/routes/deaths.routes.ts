import DeathsController, { DeathsQueryParams } from '~/controllers/deaths';
import type { Request, Response } from 'express';

import ErrorHandler from '~/handlers/error.handler';
import type { Router } from 'express';
import SuccessHandler from '~/handlers/success.handler';
import express from 'express';

const deathsRouter: Router = express.Router();

const { fetchDeaths } = new DeathsController();
const { throwInternalError } = new ErrorHandler();
const { throwSuccess } = new SuccessHandler();

deathsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const { order, sort } = req.query as unknown as DeathsQueryParams;
        const { data } = await fetchDeaths({ order, sort });
        throwSuccess({ response: res, data });
    } catch (error) {
        throwInternalError({ response: res, error });
    }
});

export default deathsRouter;
