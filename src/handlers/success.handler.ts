import { COMMON_SUCCESS_MESSAGE } from '~/messages/success';
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
    public async throwSuccess(params: SuccessHandlerParams): Promise<void> {
        const { response, status, message, data } = params;
        const statusCode = status || StatusCodes.OK;
        const msg = message || COMMON_SUCCESS_MESSAGE;
        response.status(statusCode).json({
            message: msg,
            data: data,
        });
    }
}