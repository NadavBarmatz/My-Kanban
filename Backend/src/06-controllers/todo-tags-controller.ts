import express, { NextFunction, Request, Response } from "express";
import TodoTagModel from "../03-models/todo-tag-model";
import logic from "../05-bll/todo-tags-logic";

const router = express.Router();

router.get("/", async(req: Request, res: Response, next: NextFunction) => {
    try{
        const todoId = +req.params.todoId;
        const todoTags = await logic.getAllTodoTags();
        res.json(todoTags);
    }
    catch(err: any) {
        next(err);
    }
});

router.post("/", async(req: Request, res: Response, next: NextFunction) => {
    try{
        const todoTag = new TodoTagModel(req.body);
        await logic.addTodoTag(todoTag);
        res.status(201).send();
    }
    catch(err: any) {
        next(err);
    }
});

router.delete("/:todoId/:tagId", async(req: Request, res: Response, next: NextFunction) => {
    try{
        const todoId = +req.params.todoId;
        const tagId = +req.params.tagId;
        await logic.deleteTodoTag(todoId, tagId);
        res.status(204).send();
    }
    catch(err: any) {
        next(err);
    }
});

export default router;
