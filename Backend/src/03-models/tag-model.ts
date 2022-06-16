import Joi from "joi";

class TagModel {
    public id: number;
    public name: string;

    constructor(tag: TagModel){
        this.id = tag.id;
        this.name = tag.name;
    }

    static validationSchema = Joi.object({
        id: Joi.number().forbidden(),
        name: Joi.string().required().min(3)
    })

    public validateTag(){
        const result = TagModel.validationSchema.validate(this);
        return result.error?.message;
    }
}

export default TagModel;