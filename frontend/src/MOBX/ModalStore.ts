import { makeAutoObservable } from "mobx";

export class ModalStoreImpl {
    // Used for delete modal:
    public deleteModalState: boolean = false;
    public idToDelete: number;
    // Used for new card modal:
    public newCardModalState: boolean = false;
    public createStatus: number;
    
    constructor() {
        makeAutoObservable(this);
    }

    public changeDeleteModalState(state: boolean): void {
        this.deleteModalState = state;
    }
    
    public setIdToDelete(id: number): void {
        this.idToDelete = id;
    }
    
    public changeNewCardModalState(state: boolean): void {
        this.newCardModalState = state;
    }

    public changeCreateStatus(status: number): void {
        this.createStatus = status;
    }

}

export const ModalStore = new ModalStoreImpl();