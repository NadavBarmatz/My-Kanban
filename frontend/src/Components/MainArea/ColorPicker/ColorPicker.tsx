import { observer } from "mobx-react";
import { SyntheticEvent, useState } from "react";
import todoStore from "../../../MOBX/TodoStore";
import TodoModel from "../../../Models/TodoModel";
import AddIcon from '@mui/icons-material/Add';
import "./ColorPicker.css";

const ColorPicker = (): JSX.Element => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

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
        <div className="new-todo">
        <AddIcon className="add-btn" onClick={()=>setIsOpen(!isOpen)} />
            <div className={`ColorPicker${isOpen ? " open" : ""}`} >
                <div className="orange" onClick={(e)=>{addNewCard(e)}}></div>
                <div className="green" onClick={(e)=>{addNewCard(e)}}></div>
                <div className="pink" onClick={(e)=>{addNewCard(e)}}></div>
                <div className="purple" onClick={(e)=>{addNewCard(e)}}></div>
                <div className="teal" onClick={(e)=>{addNewCard(e)}}></div>
                <div className="red" onClick={(e)=>{addNewCard(e)}}></div>
            </div>
        </div>
    );
}

export default ColorPicker;
