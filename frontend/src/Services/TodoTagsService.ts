import axios from "axios";
import todoTagsStore from "../MOBX/TodoTagsStore";
import TodoTagModel from "../Models/TodoTagModel";
import config from "../Utils/Config";

class TodoTagsService {

    public async getAllTodosTags(): Promise<TodoTagModel[]> {
        const res = await axios.get<TodoTagModel[]>(config.urls.todoTags);
        const todosTags = res.data;
        todoTagsStore.saveTodoTags(todosTags);
        return todosTags;
    }

    public async addTagToTodo(todoTag: TodoTagModel): Promise<TodoTagModel> {
        const res = await axios.post<TodoTagModel>(config.urls.todoTags, todoTag);
        const todoTagAdded = res.data;
        todoTagsStore.addTodoTag(todoTagAdded);
        return todoTagAdded;
    }

    // public async deleteTodoTag(todoTag: TodoTagModel): Promise<void> {
    //     await axios.delete(config.urls.todoTags+todoTag.todoId+"/"+todoTag.tagId);
    //     todoTagsStore.deleteTodoTag(todoTag);
    // }

}

const todoTagsService = new TodoTagsService();

export default todoTagsService;