import axios from 'axios';
import usersStore from '../MOBX/UsersStore';
import UserModel from "../Models/UserModel";
import config from "../Utils/Config";

class UsersService {

    public async getUsers(): Promise<UserModel[]> {
        const res = await axios.get<UserModel[]>(config.urls.users);
        const users =  res.data;
        usersStore.saveUsers(users);
        return users;
    }
}

const usersService = new UsersService();
export default usersService;