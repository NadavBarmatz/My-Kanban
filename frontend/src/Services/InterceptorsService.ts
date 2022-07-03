import axios from "axios";
import authStore from "../MOBX/AuthStore";

class InterceptorsService {
    public createInterceptor(): void {
        axios.interceptors.request.use((request)=>{
            // If token is present, add it to the request header
            if(authStore.token) {
                request.headers.authorization = `Bearer ${authStore.token}`;
            }
            return request;
        });
    }
}

const interceptorsService = new InterceptorsService();

export default interceptorsService;