import express, { NextFunction, Request, Response } from "express";
import verifyToken from "../02-middleware/verify-token";
import TodoModel from "../03-models/todo-model";
import logic from "../05-bll/todo-logic";

const router = express.Router();

router.get("/", verifyToken, async(req: Request, res: Response, next: NextFunction) => {
    try{
        const todos = await logic.getAllTodos();
        res.json(todos);
    }
    catch(err: any) {
        next(err);
    }
});

router.get("/:todoId", verifyToken, async(req: Request, res: Response, next: NextFunction) => {
    try{
        const todoId = +req.params.todoId;
        const todo = await logic.getTodoById(todoId);
        res.json(todo);
    }
    catch(err: any) {
        next(err);
    }
});

router.post("/", verifyToken, async(req: Request, res: Response, next: NextFunction) => {
    try{
        const todo = new TodoModel(req.body);
        const newTodo = await logic.addTodo(todo);
        res.status(201).json(newTodo);
    }
    catch(err: any) {
        next(err);
    }
});

router.put("/:todoId", verifyToken, async(req: Request, res: Response, next: NextFunction) => {
    try{
        req.body.id = +req.params.todoId;
        const todo = new TodoModel(req.body);
        const updatedTodo = await logic.updateTodo(todo);
        res.status(201).json(updatedTodo);
    }
    catch(err: any) {
        next(err);
    }
});

router.delete("/:todoId", verifyToken, async(req: Request, res: Response, next: NextFunction) => {
    try{
        const todoId = +req.params.todoId;
        await logic.deleteTodo(todoId);
        res.sendStatus(204);
    }
    catch(err: any) {
        next(err);
    }
});

export default router;
