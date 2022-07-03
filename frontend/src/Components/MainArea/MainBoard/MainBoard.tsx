import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import todoStore from "../../../MOBX/TodoStore";
import usersStore from "../../../MOBX/UsersStore";
import { StatusEnum } from "../../../Models/StatusEnum";
import TodoModel from "../../../Models/TodoModel";
import todosService from "../../../Services/TodosService";
import usersService from "../../../Services/UsersService";
import DeleteModal from "../Modals/DeleteModal/DeleteModal";
import TodoCard from "../TodoCard/TodoCard";
import "./MainBoard.css";
import ColorPicker from "../ColorPicker/ColorPicker";
import notifyService from "../../../Services/NotifyService";
import todoTagsStore from "../../../MOBX/TodoTagsStore";
import todoTagsService from "../../../Services/TodoTagsService";

const MainBoard = observer((): JSX.Element => {

    const [todos, handleTodos] = useState<TodoModel[]>(todoStore.todos);
    const [draggableId, handleDraggableId] = useState<number>();
    const [todoToUpdate, handleTodoToUpdate] = useState<TodoModel>();
    const [renderOnce, setRenderOnce] = useState<boolean>(true);
    
    useEffect(() => {
        if(!renderOnce){
            setRenderOnce(true);
            (async() => {
                try{
                    if(todoStore.todos.length !== 0) {
                        handleTodos(todoStore.todos);
                    }
                    if (todoStore.todos.length === 0) {
                        const todosFromServer = await todosService.getAllTodos();
                        handleTodos(todosFromServer);
                    }
                    if (todoTagsStore.todoTags.length === 0) {
                        await todoTagsService.getAllTodosTags();
                    }
                    if(usersStore.users.length === 0) {
                        await usersService.getUsers();
                    }
                }            
                catch(err: any) {
                    notifyService.error(err); 
                }
            })();
        }
        setRenderOnce(false);
    });

    const updateTodoStatus = (newStatus: number, e: React.DragEvent) => {
        e.preventDefault();
        if (draggableId && draggableId !== -1) {
            const todo = todos.find(t => t.id === draggableId);
            todo.statusId = newStatus;
            todo.status = StatusEnum[newStatus];
            handleTodoToUpdate(todo);
        }
    };

    const updateTodo = async () => {
        try {
            if(draggableId === -1) throw new Error("Task must be saved before changing status");
            await todosService.editTodo(todoToUpdate);
        }
        catch (err: any) {
            notifyService.error(err)
        }
    }

    return (
        <div className="MainBoard">
           <ColorPicker />
            <div className="board">
                <div className="box pending" onDragOver={(e) => { updateTodoStatus(1, e) }} onDragEnd={updateTodo}>
                    <h2>Pending</h2>
                    <div className="todos" data-status="Pending">
                        {todos?.map((todo) => todo.statusId === 1 ? <TodoCard key={todo.id} passToParent={handleDraggableId} todo={todo} /> : null)}
                    </div>
                </div>
                <div className="box in-progress" onDragOver={(e) => { updateTodoStatus(2, e) }} onDragEnd={updateTodo}>
                    <h2>In Progress</h2>
                    <div className="todos" data-status="In progress">
                        {todos?.map((todo) => todo.statusId === 2 ? <TodoCard key={todo.id} passToParent={handleDraggableId} todo={todo} /> : null)}
                    </div>
                </div>
                <div className="box waiting-for-review" onDragOver={(e) => { updateTodoStatus(3, e) }} onDragEnd={updateTodo}>
                    <h2>Waiting For Review</h2>
                    <div className="todos" data-status="Waiting for review">
                        {todos?.map((todo) => todo.statusId === 3 ? <TodoCard key={todo.id} passToParent={handleDraggableId} todo={todo} /> : null)}
                    </div>
                </div>
                <div className="box completed" onDragOver={(e) => { updateTodoStatus(4, e) }} onDragEnd={updateTodo}>
                    <h2>Completed</h2>
                    <div className="todos" data-status="Completed">
                        {todos?.map((todo) => todo.statusId === 4 ? <TodoCard key={todo.id} passToParent={handleDraggableId} todo={todo} /> : null)}
                    </div>
                </div>
            </div>
            <DeleteModal />
        </div>
    );
})

export default MainBoard;
