import type { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

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
        const msg = error instanceof Error ? error.message : 'Internal Error';
        const statusCode = status || StatusCodes.INTERNAL_SERVER_ERROR;
        response.status(statusCode).json({ error: msg });
    }
}
