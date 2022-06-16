import { OkPacket } from "mysql2";
import ClientError from "../03-Models/client-error";
import TodoModel from "../03-models/todo-model";
import dal from "../04-dal/dal";

async function getAllTodos(): Promise<TodoModel> {
    const sql = `SELECT todos.id, todos.title, todos.content, todos.userId, todos.statusId, users.username,
        todo_status.status, todos.creationTime 
        FROM todos 
        JOIN users ON users.id = todos.userId
        JOIN todo_status ON todo_status.id = todos.statusId`;
    const todoStatus = await dal.execute(sql);
    return todoStatus;
}

async function getTodoById(id: number): Promise<TodoModel> {
    const sql = `SELECT todos.id, todos.title, todos.content, todos.userId, todos.statusId, users.username, 
        todo_status.status, todos.creationTime 
        FROM todos 
        JOIN users ON users.id = todos.userId
        JOIN todo_status ON todo_status.id = todos.statusId
        WHERE todos.id = ?`;
    const todoStatus = await dal.execute(sql, [id]);
    // validate:
    if(!todoStatus[0]) throw new ClientError(404, "Todo not found");
    return todoStatus[0];
}

async function addTodo(todo: TodoModel): Promise<TodoModel> {
    // insert creation time:
    todo.creationTime = new Date().toISOString().split("T")[0];

    // validate:
    const errors = todo.validatePost();
    if(errors) throw new ClientError(400, errors);
    const sql = `INSERT INTO todos (title, content, userId, statusId, creationTime) VALUES (?, ?, ?, ?, ?)`;
    const result: OkPacket = await dal.execute(sql, [todo.title, todo.content, todo.userId, todo.statusId, todo.creationTime]);
    todo.id = result.insertId;
    return todo;
}

async function updateTodo(todo: TodoModel): Promise<TodoModel> {
    // validate:
    const errors = todo.validatePut();
    if(errors) throw new ClientError(400, errors);
    // get old todo:
    const oldTodo = await getTodoById(todo.id);
    // validate old todo:
    if(!oldTodo) throw new ClientError(404, "Todo not found");
    
    
    for(let prop in todo) {
        if(todo[prop]){
            oldTodo[prop] = todo[prop];
        }
    }
    const sql = `UPDATE todos SET title = ?, content = ?, userId = ?, statusId = ? WHERE id = ?`;
    await dal.execute(sql, [oldTodo.title, oldTodo.content, oldTodo.userId, oldTodo.statusId, oldTodo.id]);
    const updatedTodo = await getTodoById(oldTodo.id);
    return updatedTodo;
}

async function deleteTodo(id: number): Promise<void> {
    const sql = `DELETE FROM todos WHERE id = ?`;
    const deleted: OkPacket = await dal.execute(sql, [id]);
    if(deleted.affectedRows === 0) throw new ClientError(404, "Todo not found");
}



export default {
    getAllTodos,
    getTodoById,
    addTodo,
    updateTodo,
    deleteTodo
}