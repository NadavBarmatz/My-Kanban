import { Box, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { ModalStore } from "../../../../MOBX/ModalStore";
import "./DeleteModal.css";
import todosService from "../../../../Services/TodosService";
import Style from "../modalStyle";

const DeleteModal = observer((): JSX.Element => {
    // Required by modal material documentation:
    const style = Style;
    // Determine if modal is closed or open:
    const [open, setOpen] = useState<boolean>(ModalStore.deleteModalState);
    // Set open state: 
    useEffect(()=>{
        setOpen(ModalStore.deleteModalState)
    },[ModalStore.deleteModalState])
    // Handle close modal and reset id to delete in the store:
    const closeModal = () => {
        ModalStore.changeDeleteModalState(false);
        ModalStore.setIdToDelete(null);
    }
    // Handle delete todo from db:
    const handleDeleteTodo = async() => {
        try{
            await todosService.deleteTodo(ModalStore.idToDelete);
            closeModal();
        }
        catch(err: any) {
            alert(err.message)
        }
    }

    return (
        <div className="DeleteModal">
            <Modal open={open} onClose={closeModal}>
                <Box sx={style}>
                    <h2>Are you sure you want to delete this todo card?</h2>
                    <div className="action-buttons-container">
                        <button className="btn-success" onClick={handleDeleteTodo}>YES</button>
                        <button className="btn-error" onClick={closeModal}>CANCEL</button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
})

export default DeleteModal;
