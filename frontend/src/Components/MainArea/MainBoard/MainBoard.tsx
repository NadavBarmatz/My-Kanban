import { observer } from "mobx-react";
import React, { SyntheticEvent, useEffect, useState } from "react";
import todoStore from "../../../MOBX/TodoStore";
import usersStore from "../../../MOBX/UsersStore";
import { StatusEnum } from "../../../Models/StatusEnum";
import TodoModel from "../../../Models/TodoModel";
import todosService from "../../../Services/TodosService";
import usersService from "../../../Services/UsersService";
import DeleteModal from "../Modals/DeleteModal/DeleteModal";
import TodoCard from "../TodoCard/TodoCard";
import "./MainBoard.css";

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
            console.error(err.message)    
        }
    }, [todoStore.todos]);

    const updateTodoStatus = (newStatus: number, e: React.DragEvent) => {
        e.preventDefault();
        if (draggableId) {
            const todo = todos.find(t => t.id === draggableId);
            todo.statusId = newStatus;
            todo.status = StatusEnum[newStatus];
            handleTodoToUpdate(todo);
        }
    };

    const updateTodo = async () => {
        try {
            await todosService.editTodo(todoToUpdate);
            handleTodos(todoStore.todos)
        }
        catch (err: any) {
            console.error(err.message);
        }
    }

    const createNewTodoCard = (e: SyntheticEvent) => {
        // Make sure doubleClick:
        if ((e as any).detail === 2) {
            if (todoStore.newTodoState === true) {
                todoStore.deleteTodo(undefined);
            }
            todoStore.changeNewTodoState(true);
            //    Get status value from dataset:
            const columnStatus: string = e.currentTarget.attributes[1].value;
            // create new todo instance:
            const newTodo = new TodoModel();
            // fill in start fields:
            newTodo.status = columnStatus;
            newTodo.statusId = StatusEnum[(columnStatus as "Pending")];
            newTodo.title = "TITLE";
            newTodo.content = "CONTENT...";
            newTodo.username = "Choose..";
            newTodo.id = -1;
            // add only to mobX to render
            todoStore.addTodo(newTodo);
        }
    }

    return (
        <div className="MainBoard">
            <div className="board">
                <div className="box pending" onDragOver={(e) => { updateTodoStatus(1, e) }} onDragEnd={updateTodo}>
                    <h2>Pending</h2>
                    <div className="todos" data-status="Pending" onClick={createNewTodoCard}>
                        {todos?.map((todo) => todo.statusId === 1 ? <TodoCard key={todo.id} passToParent={handleDraggableId} todo={todo} /> : null)}
                    </div>
                </div>
                <div className="box in-progress" onDragOver={(e) => { updateTodoStatus(2, e) }} onDragEnd={updateTodo}>
                    <h2>In Progress</h2>
                    <div className="todos" data-status="In progress" onClick={createNewTodoCard}>
                        {todos?.map((todo) => todo.statusId === 2 ? <TodoCard key={todo.id} passToParent={handleDraggableId} todo={todo} /> : null)}
                    </div>
                </div>
                <div className="box waiting-for-review" onDragOver={(e) => { updateTodoStatus(3, e) }} onDragEnd={updateTodo}>
                    <h2>Waiting For Review</h2>
                    <div className="todos" data-status="Waiting for review" onClick={createNewTodoCard}>
                        {todos?.map((todo) => todo.statusId === 3 ? <TodoCard key={todo.id} passToParent={handleDraggableId} todo={todo} /> : null)}
                    </div>
                </div>
                <div className="box completed" onDragOver={(e) => { updateTodoStatus(4, e) }} onDragEnd={updateTodo}>
                    <h2>Completed</h2>
                    <div className="todos" data-status="Completed" onClick={createNewTodoCard}>
                        {todos?.map((todo) => todo.statusId === 4 ? <TodoCard key={todo.id} passToParent={handleDraggableId} todo={todo} /> : null)}
                    </div>
                </div>
            </div>
            <DeleteModal />
        </div>
    );
})

export default MainBoard;
