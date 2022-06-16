import Joi from "joi";
import TodoTagModel from "./todo-tag-model";

class TodoModel {
    public id: number;
    public title: string;
    public content: string;
    public userId: number;
    public statusId: number;
    public creationTime: string;

    constructor(todo: TodoModel) {
        this.id = todo.id;
        this.title = todo.title;
        this.content = todo.content;
        this.userId = todo.userId;
        this.statusId = todo.statusId;
        this.creationTime = todo.creationTime;
    };

    static postValidationSchema = Joi.object({
        id: Joi.number().forbidden(),
        title: Joi.string().required().min(4).max(30),
        content: Joi.string().optional().max(150),
        userId: Joi.number().optional(),
        statusId: Joi.number().required(),
        creationTime: Joi.date().required().min(new Date().toDateString())
    });

    static putValidationSchema = Joi.object({
        id: Joi.number().required(),
        title: Joi.string().optional().min(4).max(30),
        content: Joi.string().optional().max(150),
        userId: Joi.number().optional(),
        statusId: Joi.number().optional(),
        creationTime: Joi.date().optional()
    });

    public validatePost() {
        const result = TodoModel.postValidationSchema.validate(this);
        return result.error?.message;
    }

    public validatePut() {
        const result = TodoModel.putValidationSchema.validate(this);
        return result.error?.message;
    }
}

export default TodoModel;