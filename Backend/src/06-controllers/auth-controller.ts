
import express, { NextFunction, Request, Response } from "express";
import CredentialsModel from "../03-models/credentials-model";
import { Role } from "../03-Models/role";
import UserModel from "../03-Models/user-model";
import logic from "../05-bll/auth-logic";

const router = express.Router();

router.post("/register", async (req: Request, res: Response, next: NextFunction) => {
    try{
        req.body.role = Role.User;
        const userToAdd = new UserModel(req.body);
        const token = await logic.register(userToAdd);
        res.status(201).json(token)
    }
    catch(err: any) {
        next(err);
    }
});

router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    try{
        const credentials = new CredentialsModel(req.body);
        const token = await logic.login(credentials);
        res.status(201).json(token)
    }
    catch(err: any) {
        next(err);
    }
});

export default router;
