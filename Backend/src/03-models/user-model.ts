import Joi from "joi";

class UserModel {
    public id: number;
    public firstName: string;
    public lastName: string;
    public username: string;
    public email: string;
    public title: string;
    public password: string;
    public role: number;

    public constructor(user: UserModel){
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.email = user.email;
        this.title = user.title;
        this.password = user.password;
        this.role = user.role;
    };

    static postValidationSchema = Joi.object({
        id: Joi.string().forbidden(),
        firstName: Joi.string().required().min(3).max(15),
        lastName: Joi.string().required().min(3).max(20),
        username: Joi.string().required().min(2).max(15),
        email: Joi.string().email({minDomainSegments: 2, tlds: {allow: ['com', 'net', 'co.il']}}),
        title: Joi.string().optional(),
        password: Joi.string().required(),
        role: Joi.number().required()
    });

    static putValidationSchema = Joi.object({
        id: Joi.string().required(),
        firstName: Joi.string().required().min(3).max(15),
        lastName: Joi.string().required().min(3).max(20),
        username: Joi.string().required().min(2).max(15),
        email: Joi.string().email({minDomainSegments: 2, tlds: {allow: ['com', 'net', 'co.il']}}),
        title: Joi.string().required(),
        password: Joi.string().required(),
        role: Joi.number().required()
    });

    public validatePost() {
        const result = UserModel.postValidationSchema.validate(this);
        return result.error?.message
    };

    public validatePut() {
        const result = UserModel.putValidationSchema.validate(this);
        return result.error?.message
    };
}

export default UserModel