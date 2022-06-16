import axios from "axios";
import authStore from "../MOBX/AuthStore";
import CredentialsModel from "../Models/CredentialsModel";
import UserModel from "../Models/UserModel";
import config from "../Utils/Config";

class AuthService {
    public async login(credentials: CredentialsModel): Promise<string> {
        const res = await axios.post<string>(config.urls.login, credentials);
        const token = res.data;
        return token;
    }
    
    public async register(user: UserModel): Promise<string> {
        const res = await axios.post<string>(config.urls.register, user);
        const token = res.data;
        authStore.login(token);
        return token;
    }
}

const authService = new AuthService();
export default authService;