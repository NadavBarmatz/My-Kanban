import { OkPacket } from 'mysql2';
import ClientError from "../03-Models/client-error";
import TodoTagModel from "../03-models/todo-tag-model";
import dal from "../04-dal/dal";

async function getAllTodosVsTags(): Promise<TodoTagModel[]> {
    const sql = "SELECT * FROM tagsvstodo;";
    const todosVsTags = await dal.execute(sql);
    return todosVsTags;
}

async function getAllTodoTags(todoId: number): Promise<TodoTagModel[]>{
    const sql = "SELECT tagsvstodo.todoId, tags.name FROM tagsvstodo JOIN tags ON tagsvstodo.tagId = tags.id WHERE todoId = ?;"
    const todoTags = await dal.execute(sql, [todoId]);
    return todoTags;
}

async function addTodoTag(todoTag: TodoTagModel): Promise<void> {
    // validate:
    const errors = todoTag.validateTodoTag();
    if(errors) throw new ClientError(400, errors);
    // check if todoTag exists:
    const allTodosTags = await getAllTodosVsTags();
    const todoTagExists = allTodosTags.find(tag => tag.todoId === todoTag.todoId && tag.tagId === todoTag.tagId);
    if(todoTagExists) throw new ClientError(409, "Todo tag already exists");
    // if not, add:
    const sql = "INSERT INTO tagsvstodo (todoId, tagId) VALUES (?,?)";
    const values = [todoTag.todoId, todoTag.tagId];
    await dal.execute(sql, values);
}

async function deleteTodoTag(todoId: number, tagId: number): Promise<void> {
    const sql = "DELETE FROM tagsvstodo WHERE todoId = ? AND tagId = ?;";
    const values = [todoId, tagId];
    const deleted: OkPacket = await dal.execute(sql, values);
    if(deleted.affectedRows === 0) throw new ClientError(404, "Todo tag not found");
}

export default {
    getAllTodoTags,
    addTodoTag,
    deleteTodoTag
}