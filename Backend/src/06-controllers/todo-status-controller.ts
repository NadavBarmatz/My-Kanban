import express, { NextFunction, Request, Response } from "express";
import logic from "../05-bll/todo-status-logic";

const router = express.Router();

router.get("/:todoId", async(req: Request, res: Response, next: NextFunction) => {
    try{
        const todoId = +req.params.todoId;
        const todoStatus = await logic.getTodoStatusById(todoId);
        res.json(todoStatus);
    }
    catch(err: any) {
        next(err);
    }
});

export default router;
