import TodoStatusModel from "../03-models/todo-status-model";
import dal from "../04-dal/dal";

async function getTodoStatusById(id: number): Promise<TodoStatusModel> {
    const sql = "SELECT * FROM todoStatus WHERE id = ?;";
    const todoStatus = await dal.execute(sql, [id]);
    return todoStatus[0];
}

export default {
    getTodoStatusById
}