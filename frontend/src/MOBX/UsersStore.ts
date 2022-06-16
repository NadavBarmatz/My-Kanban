import { makeAutoObservable } from "mobx";
import UserModel from "../Models/UserModel";

class UsersStore {
    public users: UserModel[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    public saveUsers(users: UserModel[]): void {
        this.users = users;
    }

    public addUser(user: UserModel): void {
        this.users.push(user);
    }

    public editUser(user: UserModel): void {
        const index = this.users.findIndex(u => u.id === user.id);
        this.users[index] = user;
    }

    public deleteUser(userId: number): void {
        const index = this.users.findIndex(u => u.id === userId);
        this.users.splice(index, 1);
    }
    
}

const usersStore = new UsersStore();

export default usersStore;
