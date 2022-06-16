import { autorun, makeAutoObservable, toJS } from "mobx";
import TodoModel from "../Models/TodoModel";

class TodoStore {
    public todoArr: TodoModel[] = [];
    public newTodoState: boolean = false;

    constructor() {
        makeAutoObservable(this)
    }

    public saveTodos(todos: TodoModel[]): void {
        this.todoArr = todos;
    }

    public addTodo(todo: TodoModel): void {
        this.todoArr.push(todo);
    }

    public editTodo(todo: TodoModel): void {
        const index = this.todoArr.findIndex(t => t.id === todo.id);
        console.log("From Store: ", this.todoArr[index]);
        this.todoArr[index] = todo;
    }

    public deleteTodo(todoId: number | null): void {
        const index = this.todoArr.findIndex(t => t.id === todoId);
        this.todoArr.splice(index, 1);
    }

    public get todos(): TodoModel[] {
        return toJS(this.todoArr);
    }

    public changeNewTodoState(state: boolean): void {
        this.newTodoState = state;
    }
}
const todoStore = new TodoStore();

export default todoStore;

autorun(()=>{
    console.log("[Autorun] ", todoStore.todos);
})