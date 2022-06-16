import { OkPacket } from "mysql2";
import jwt from "../01-utils/jwt";
import ClientError from "../03-Models/client-error";
import CredentialsModel from "../03-models/credentials-model";
import UserModel from "../03-Models/user-model";
import dal from "../04-dal/dal";
import { hashing } from "../helpers/hash-passwords";
import usersLogic from "./users-logic";

async function register(user: UserModel): Promise<string> {
    //! hash password:
    user.password = hashing(user.password);

    // validate
    const errors = user.validatePost();
    if(errors) throw new ClientError(400, errors);
    
    // Check if username or email is already in system:
    const users = await usersLogic.getAllUsers();
    users.forEach(u => {
        if( u.email === user.email || u.username === user.username) throw new ClientError(400, "Username or Email is already taken")
    });

    const sql = 'INSERT INTO users (firstName, lastName, username, email, title, role, password) VALUES (?,?,?,?,?,?,?)';
    const values = [user.firstName, user.lastName, user.username, user.email, user.title, user.role, user.password];
    const result: OkPacket = await dal.execute(sql, values);
    
    user.id = result.insertId;
    user.password = undefined;

    const token = jwt.getNewToken(user);
    return token;
}

async function login(credentials: CredentialsModel): Promise<string> {
    //! hash password:
    credentials.password = hashing(credentials.password);

    // validate:
    const errors = credentials.validateCredentials();
    if(errors) throw new ClientError(400, errors);

    // get all users and search for user:
    const users = await usersLogic.getAllUsers();
    const user = users.find(user => user.username === credentials.username && user.password === credentials.password);
    if(!user) throw new ClientError(404, "username or password is incorrect");
    user.password = undefined;

    const token = jwt.getNewToken(user);

    return token;
}

export default{ 
    register,
    login
};
