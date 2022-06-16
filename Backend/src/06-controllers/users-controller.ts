
import express, { NextFunction, Request, Response } from "express";
import UserModel from "../03-Models/user-model";
import logic from "../05-bll/users-logic";

const router = express.Router();

router.get("/", async(req: Request, res: Response, next: NextFunction) => {
    try{
        const users = await logic.getAllUsers();
        res.json(users);
    }
    catch(err: any) {
        next(err);
    }
});

router.post("/:id", async(req: Request, res: Response, next: NextFunction) => {
    try{
        req.body.id = +req.params.id;
        const updatedUser = new UserModel(req.body);
        const token = await logic.updateUser(updatedUser);
        res.status(201).json(token);
    }
    catch(err: any) {
        next(err);
    }
});

export default router;
