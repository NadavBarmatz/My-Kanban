import { NextFunction, Request, Response } from "express";
import jwt from "../01-Utils/jwt";
import ClientError from "../03-Models/client-error";
import Role from "../03-Models/role";



async function verifyAdmin(request: Request, response: Response, next: NextFunction): Promise<void> {

    // Verify if token is valid:
    const isValid = await jwt.verifyToken(request);

    // If not valid:
    if(!isValid) {
        const err = new ClientError(401, "Invalid or expired Token. \n Please re-login to generate new Token.");
        next(err);
        return;
    }

    // Extract user from token:
    const user = jwt.getUserFromToken(request);
    
    // If role is not admin:
    if(user.role !== Role.Admin) {
        const err = new ClientError(403, "You are not authorized");
        next(err);
        return;
    }

    next();
}

export default verifyAdmin;


