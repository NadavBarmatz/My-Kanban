import { observer } from "mobx-react";
import { SyntheticEvent } from "react";
import todoStore from "../../../MOBX/TodoStore";
import TodoModel from "../../../Models/TodoModel";
import "./ColorPicker.css";

const ColorPicker = observer((): JSX.Element => {

    const addNewCard = (e: SyntheticEvent) => {
        if(todoStore.newTodoState === true) todoStore.deleteTodo(undefined);
        todoStore.changeNewTodoState(true);
        const newTodo = new TodoModel();
        newTodo.id = -1;
        newTodo.statusId = 1;
        newTodo.status = "Pending";
        newTodo.title = "Title";
        newTodo.content = "Content";
        newTodo.color = (e.target as HTMLElement).className;
        todoStore.addTodo(newTodo)
        
    }

    return (
        <div className={`ColorPicker${todoStore.openColorPickerState ? " open" : ""}`} >
            <div className="orange" onClick={(e)=>{addNewCard(e)}}></div>
            <div className="green" onClick={(e)=>{addNewCard(e)}}></div>
            <div className="pink" onClick={(e)=>{addNewCard(e)}}></div>
            <div className="purple" onClick={(e)=>{addNewCard(e)}}></div>
            <div className="teal" onClick={(e)=>{addNewCard(e)}}></div>
            <div className="red" onClick={(e)=>{addNewCard(e)}}></div>
        </div>
    );
})

export default ColorPicker;
