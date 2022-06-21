import { autorun, makeAutoObservable, toJS } from "mobx";
import TodoModel from "../Models/TodoModel";

class TodoStore {
    public todoArr: TodoModel[] = [];
    public newTodoState: boolean = false;
    public openColorPickerState: boolean = false;

    constructor() {
        makeAutoObservable(this)
    }

    public saveTodos(todos: TodoModel[]): void {
        this.todoArr = todos;
    }

    public addTodo(todo: TodoModel): void {
        console.log("From add Todo");
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

    public changeOpenColorPickerState(state: boolean): void {
        this.openColorPickerState = state;
    }

    public get pendingCount(): number {
        return this.todoArr.filter(todo => todo.status === "Pending").length;
    }

    public get inProgressCount(): number {
        return this.todoArr.filter(todo => todo.status === "In progress").length;
    }

    public get waitingCount(): number {
        return this.todoArr.filter(todo => todo.status === "Waiting for review").length;
    }

    public get completedCount(): number {
        return this.todoArr.filter(todo => todo.status === "Completed").length;
    }
}
const todoStore = new TodoStore();

export default todoStore;

autorun(()=>{
    console.log("[Autorun] ", todoStore.todos, "newTodoState", todoStore.newTodoState);
});