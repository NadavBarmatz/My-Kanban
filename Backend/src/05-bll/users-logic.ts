import jwt from "../01-utils/jwt";
import ClientError from "../03-Models/client-error";
import UserModel from "../03-Models/user-model";
import dal from "../04-dal/dal";

async function getAllUsers(): Promise<UserModel[]> {
    const sql = 'SELECT * FROM users';
    const users = await dal.execute(sql);
    return users;
}

async function getUserById(id: number): Promise<UserModel> {
    const sql = "SELECT * FROM users WHERE id = ?";
    const user = await dal.execute(sql, [id]);
    return user;
}

async function updateUser(user: UserModel): Promise<string> {
    // validate:
    const errors = user.validatePut();
    if(errors) throw new ClientError(400, errors);

    // get user:
    const userToUpdate = await getUserById(user.id);

    for (let prop in user) {
        userToUpdate[prop] = user[prop];
    }

    const sql = "UPDATE users SET firstName = ?, lastName = ?, username = ?, email = ?, title = ?, role = ?, password = ?, companyName = ? WHERE id = ?";
    const values = [userToUpdate.firstName, userToUpdate.lastName, userToUpdate.username, userToUpdate.email, 
        userToUpdate.title, userToUpdate.role, userToUpdate.password, userToUpdate.id, userToUpdate.companyName];
    await dal.execute(sql, values)

    userToUpdate.password = undefined;
    const token = jwt.getNewToken(userToUpdate);
    return token;
}

export default{ 
    getAllUsers,
    updateUser
};
