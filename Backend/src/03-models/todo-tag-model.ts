import Joi from "joi";

class TodoTagModel {
    public tagId: number;
    public todoId: number;

    public constructor (tag: TodoTagModel) {
        this.tagId = tag.tagId;
        this.todoId = tag.todoId;
    };

    static validationSchema = Joi.object({
        tagId: Joi.number().required(),
        todoId: Joi.number().required(),
    });

    public validateTodoTag() {
        const result = TodoTagModel.validationSchema.validate(this);
        return result.error?.message;
    };

}

export default TodoTagModel;