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
import AddIcon from '@mui/icons-material/Add';
import "./MainBoard.css";
import ColorPicker from "../ColorPicker/ColorPicker";
import notifyService from "../../../Services/NotifyService";

const MainBoard = observer((): JSX.Element => {

    const [todos, handleTodos] = useState<TodoModel[]>();
    const [draggableId, handleDraggableId] = useState<number>();
    const [todoToUpdate, handleTodoToUpdate] = useState<TodoModel>();
    
    useEffect(() => {
        try{
            handleTodos(todoStore.todos);
            if (!todos) {
                (async () => {
                    const todosFromServer = await todosService.getAllTodos();
                    handleTodos(todosFromServer);
                })();
            }

            if(usersStore.users.length === 0) {
                (async() => {
                    await usersService.getUsers();
                })();
        }
        }
        catch(err: any) {
            notifyService.error(err); 
        }
    }, [todoStore.todos]);

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

    const openColorPicker = () => {
        todoStore.changeOpenColorPickerState(!todoStore.openColorPickerState);
    }

    return (
        <div className="MainBoard">
            <div className="new-todo">
                <AddIcon className="add-btn" onClick={openColorPicker} />
                <ColorPicker />
            </div>
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
