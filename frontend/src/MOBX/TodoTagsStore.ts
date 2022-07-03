import { autorun, makeAutoObservable, toJS } from "mobx";
import TodoTagModel from "../Models/TodoTagModel";

class TodoTagsStore {
    public todoTags: TodoTagModel[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    public saveTodoTags(todoTags: TodoTagModel[]): void {
        this.todoTags = todoTags;
    }

    public addTodoTag(todoTag: TodoTagModel): void {
        this.todoTags.push(todoTag);
    }

    public deleteTodoTag(todoTag: TodoTagModel): void {
        const index = this.todoTags.findIndex(t => t.todoId === todoTag.todoId && t.name === todoTag.name);
        this.todoTags.splice(index, 1);
    }

    public get getTodoTags(): TodoTagModel[] {
        return toJS(this.todoTags);
    }
}

const todoTagsStore = new TodoTagsStore();

export default todoTagsStore;