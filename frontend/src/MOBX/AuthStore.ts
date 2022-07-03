import { autorun, makeAutoObservable, toJS } from 'mobx';
import UserModel from '../Models/UserModel';
import jwtDecode from "jwt-decode";

class AuthStore {
    public token: string;
    public user: UserModel;

    constructor() {
        makeAutoObservable(this);
        if(localStorage.getItem("token")) {
            this.login(localStorage.getItem("token"));
        }
    }   

    public register(token: string) {
        this.login(token)
    }

    public login(token: string) {
        this.token = token;
        const decodedUser = jwtDecode(token);
        this.user = (decodedUser as any).user;
        localStorage.setItem("token", token);
    }
    
    public logout() {
        this.token = undefined;
        this.user = undefined;
        localStorage.removeItem("token");
    }

    public get getUser() {
        return toJS(this.user);
    }

    public get isLoggedIn(): boolean {
        return this.token !== undefined;
    }
}

const authStore = new AuthStore();
export default authStore;
