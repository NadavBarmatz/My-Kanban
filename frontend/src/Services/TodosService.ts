import axios from "axios";
import todoStore from "../MOBX/TodoStore";
import TodoModel from "../Models/TodoModel";
import config from "../Utils/Config";

class TodosService {

    public async getAllTodos(): Promise<TodoModel[]> {
        const res = await axios.get<TodoModel[]>(config.urls.todos);
        const todos = res.data;
        todoStore.saveTodos(todos)
        return todos;
    }

    private async getOneTodo(todoId: number): Promise<TodoModel> {
        const res = await axios.get<TodoModel>(config.urls.todos + todoId);
        const todo = res.data;
        return todo;
    }

    public async createTodo(todo: TodoModel): Promise<TodoModel> {
        todoStore.deleteTodo(-1);
        todo.id = undefined;
        const res = await axios.post<TodoModel>(config.urls.todos, todo);
        const todoCreated = res.data;
        const todoFromDB = await this.getOneTodo(todoCreated.id);
        todoStore.addTodo(todoFromDB);
        return todoFromDB;
    }

    public async editTodo(todo: TodoModel): Promise<TodoModel> {
        const res = await axios.put<TodoModel>(config.urls.todos + todo.id, todo);
        console.log("ok")
        const todoEdited = res.data;
        todoStore.editTodo(todoEdited);
        return todoEdited;
    }

    public async deleteTodo(todoId: number): Promise<void> {
        await axios.delete(config.urls.todos + todoId);
        todoStore.deleteTodo(todoId)
    }
}

const todosService = new TodosService();
export default todosService;