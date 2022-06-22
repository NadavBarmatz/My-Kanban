import { TodoCardProps } from './TodoCard';
import todoStore from "../../../MOBX/TodoStore";
import { ModalStore } from '../../../MOBX/ModalStore';
import { SyntheticEvent } from 'react';
import todosService from '../../../Services/TodosService';
import TodoModel from '../../../Models/TodoModel';
import usersStore from '../../../MOBX/UsersStore';
import notifyService from '../../../Services/NotifyService';

const handleDragStart = (props: TodoCardProps) => {
    props.passToParent(props.todo.id);
}

const handleDeleteModal = (props: TodoCardProps): void => {
    if(props.todo.id === -1) {
        todoStore.deleteTodo(undefined);
        todoStore.changeNewTodoState(false);
        return ;
    }
    ModalStore.changeDeleteModalState(!ModalStore.deleteModalState);
    ModalStore.setIdToDelete(props.todo?.id);
}

const handleContentChange = (e: SyntheticEvent, setTodoContent: Function) => {
    const textareaElement = (e.target as HTMLTextAreaElement) 
    setTodoContent(textareaElement.value);
    textareaElement.style.height = textareaElement.scrollHeight + 'px';
}

const handleTitleChange = (e: SyntheticEvent, setTodoTitle: Function) => {
    const textareaElement = (e.target as HTMLTextAreaElement) 
    setTodoTitle(textareaElement.value);
    textareaElement.style.height = textareaElement.scrollHeight + 'px';
}

const handleUserChange = (e: SyntheticEvent, setTodoUserId: Function, setTodoUsername: Function) => {
    const userId = +(e.target as HTMLSelectElement).value;
    if(userId === undefined) return;
    const username = usersStore.users.find(user => user.id === userId)?.username
    setTodoUserId(userId);
    setTodoUsername(username);
}

const updateTodo = async (todoContent: string, todoTitle: string, todoUserId: number, props: TodoCardProps) => {
    try {
        if(todoContent !== props?.todo.content) props.todo.content = todoContent;
        if(todoTitle !== props?.todo.title) props.todo.title = todoTitle;
        if(todoUserId !== props?.todo.userId) props.todo.userId = todoUserId;
        
        
        if(props?.todo.title === undefined || 
            props?.todo.content === undefined || 
            props?.todo.userId === undefined || 
            props?.todo.statusId === undefined) return;

            props.todo.id = undefined;
            
            await todosService.editTodo(props.todo);
        }
        catch(err: any) {
            notifyService.error(err);
        }
    }
    
    const createTodo = async (todoContent: string, todoTitle: string, todoUserId: number, props: TodoCardProps) => {
        try {
            if(todoContent !== props?.todo.content) props.todo.content = todoContent;
            if(todoTitle !== props?.todo.title) props.todo.title = todoTitle;
            if(todoUserId !== props?.todo.userId) props.todo.userId = todoUserId;            
            todoStore.changeNewTodoState(false);
            const newTodo = await todosService.createTodo(props.todo);
            todoStore.editTodo(newTodo);
    }
    catch(err: any) {
        notifyService.error(err);

    }
}

export default {
    handleDragStart,
    handleDeleteModal,
    handleContentChange,
    handleTitleChange,
    handleUserChange,
    updateTodo,
    createTodo
}