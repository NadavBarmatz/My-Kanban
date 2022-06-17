import { SyntheticEvent, useEffect, useState } from "react";
import TodoModel from "../../../Models/TodoModel";
import "./TodoCard.css";
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { StatusEnum } from "../../../Models/StatusEnum";
import usersStore from "../../../MOBX/UsersStore";
import TodoCardLogic from "./TodoCardLogic";
import todoStore from "../../../MOBX/TodoStore";
import { observer } from "mobx-react";


export interface TodoCardProps {
	todo: TodoModel;
    passToParent: Function;
}

const TodoCard = observer((props: TodoCardProps): JSX.Element => {
    
    const [todoClass, handleTodoClass] = useState<string>();
    const [todoContent, setTodoContent] = useState<string>(props.todo?.content);
    const [todoTitle, setTodoTitle] = useState<string>(props.todo?.title);
    const [todoUserId, setTodoUserId] = useState<number>(props.todo?.userId);
    const [todoUsername, setTodoUsername] = useState<string>(props.todo?.username);

    const [pickUserState, setPickUserState] = useState<boolean>(false);
    const [contentWritableState, setContentWritableState] = useState<boolean>(false);
    const [titleWritableState, setTitleWritableState] = useState<boolean>(false);

    // Set todo CSS class for coloring: 
    useEffect(()=>{ 
        switch(props.todo?.status) {
            case StatusEnum[1]:
                handleTodoClass('pending');
                break;
            case StatusEnum[2]:
                handleTodoClass('progress');
                break;
            case StatusEnum[3]:
                handleTodoClass('waiting');
                break;
            case StatusEnum[4]:
                handleTodoClass('completed');
                break;
        }
    }, [props.todo]);

    const handleDragStart = () => TodoCardLogic.handleDragStart(props);
    const handleDeleteModal = () => TodoCardLogic.handleDeleteModal(props);
    const handleContentChange = (e: SyntheticEvent) => TodoCardLogic.handleContentChange(e, setTodoContent);
    const handleTitleChange = (e: SyntheticEvent) => TodoCardLogic.handleTitleChange(e, setTodoTitle);
    const handleUserChange = (e: SyntheticEvent) => TodoCardLogic.handleUserChange(e, setTodoUserId, setTodoUsername);
    
    const updateTodo = () => TodoCardLogic.updateTodo(todoContent, todoTitle, todoUserId, props);
    const createTodo = () => TodoCardLogic.createTodo(todoContent, todoTitle, todoUserId, props);
    
    const createOrUpdate = () => {
        if(props.todo.id === undefined) return createTodo();
        updateTodo()
    }

    return (
        <div 
            draggable={true} onDoubleClick={(e)=>{e.stopPropagation()}} onClick={(e)=>{e.stopPropagation()}} 
            onDragStart={handleDragStart} 
            className={`TodoCard ${todoClass}`}
        >
            <div className="control-btn">
                <SaveIcon className="save-icon" onClick={createOrUpdate} />
                <CloseIcon className="delete-icon" onClick={handleDeleteModal} />
            </div>

            {
                titleWritableState ?
                <textarea className="title" spellCheck={false} value={todoTitle} onChange={handleTitleChange} onBlur={()=>{setTitleWritableState(false)}} />
                :
                <h3 className="title" onDoubleClick={()=>{setTitleWritableState(true)}}>{todoTitle}</h3>
            }

            {
                contentWritableState ?
                <textarea className="content" onChange={handleContentChange} onBlur={()=>{setContentWritableState(false)}} value={todoContent} />
                :
                <p className="content" onDoubleClick={()=>{setContentWritableState(true)}}>{todoContent}</p>
            }

            {
                pickUserState ?
                <select defaultValue={todoUserId} onChange={handleUserChange} onBlur={() => {setPickUserState(false)}}>
                    {usersStore.users.map(user => <option key={user.id} value={user.id}>{user.username}</option>)}
                </select> :
                <p className="username-paragraph" onDoubleClick={()=>{setPickUserState(true)}}>{todoUserId ? todoUsername : 'Choose'}</p>
            }
                <p>{props.todo?.status}</p>
                <p>{props.todo?.creationTime}</p>
        </div>
    );
})

export default TodoCard;
