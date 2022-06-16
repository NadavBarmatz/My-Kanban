
import { NextFunction, Request, Response } from "express";
import ClientError from "../03-Models/client-error";
import { getError } from "../helpers/error-helper";

function errorsHandler(err: any, request: Request, response: Response, next: NextFunction): void {

    // Crash, like throw...: 
    if(err instanceof Error) {
        err.message = getError(err);
        response.status((err as any).status || 500).send(err.message);
        return;
    }

    // Client error: 
    if(err instanceof ClientError) {
        response.status(err.status).send(err.message);
        return;
    }

    next();
}


export default errorsHandler;
