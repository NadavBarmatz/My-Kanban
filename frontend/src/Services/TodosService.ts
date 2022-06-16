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

    public async createTodo(todo: TodoModel): Promise<TodoModel> {
        const res = await axios.post<TodoModel>(config.urls.todos, todo);
        const todoCreated = res.data;
        todoStore.addTodo(todoCreated);
        return todoCreated;
    }

    public async editTodo(todo: TodoModel): Promise<TodoModel> {
        const res = await axios.put<TodoModel>(config.urls.todos + todo.id, todo);
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