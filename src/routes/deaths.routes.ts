import type { Request, Response } from 'express';

import DeathsController from '~/controllers/deaths';
import { DeathsQueryParams } from '~/interfaces/deaths.interface';
import ErrorHandler from '~/handlers/error.handler';
import type { Router } from 'express';
import SuccessHandler from '~/handlers/success.handler';
import express from 'express';

const deathsRouter: Router = express.Router();

const { fetchDeaths } = new DeathsController();
const { _throwInternalError } = new ErrorHandler();
const { _throwSuccess } = new SuccessHandler();

deathsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const { order, sort } = req.query as unknown as DeathsQueryParams;
        const { data } = await fetchDeaths({ order, sort });
        _throwSuccess({ response: res, data });
    } catch (error) {
        _throwInternalError({ response: res, error });
    }
});

export default deathsRouter;
