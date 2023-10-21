import type { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

interface SuccessHandlerParams {
    response: Response;
    message?: string;
    status?: StatusCodes;
    data?: unknown;
}

export interface SuccessResponse {
    message: string;
    data: unknown;
}

export default class SuccessHandler {
    public async _throwSuccess(params: SuccessHandlerParams): Promise<void> {
        const { response, status, message, data } = params;
        const statusCode = status || StatusCodes.OK;
        const msg = message;
        response.status(statusCode).json({
            message: msg,
            data: data,
        });
    }
}
