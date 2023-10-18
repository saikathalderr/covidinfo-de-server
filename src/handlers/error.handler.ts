import type { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { THROW_INTERNAL_SERVER_ERROR } from '~/messages/errors';

interface ErrorHandlerArgs {
    response: Response;
    status?: StatusCodes;
    error: unknown;
}

export interface ErrorResponse {
    error: string;
}

export default class ErrorHandler {
    public async throwInternalError(params: ErrorHandlerArgs) {
        const { response, status, error } = params;
        const msg = error instanceof Error ? error.message : THROW_INTERNAL_SERVER_ERROR;
        const statusCode = status || StatusCodes.INTERNAL_SERVER_ERROR;
        response.status(statusCode).json({ error: msg });
    }
}
