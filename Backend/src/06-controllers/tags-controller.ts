
import express, { NextFunction, Request, Response } from "express";
import TagModel from "../03-models/tag-model";
import logic from "../05-bll/tags-logic";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try{
        const tags = await logic.getAllTags();
        res.json(tags);
    }
    catch(err: any) {
        next(err);
    }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try{
        const tag = new TagModel(req.body);
        const added = await logic.addTag(tag);
        res.status(201).json(added);
    }
    catch(err: any) {
        next(err);
    }
});

router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try{
        const id = +req.params.id;
        await logic.deleteTag(id);
        res.status(204).send();
    }
    catch(err: any) {
        next(err);
    }
});


export default router;
