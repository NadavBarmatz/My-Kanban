import "./Login.css";
import { useForm } from "react-hook-form"
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import { useNavigate } from "react-router-dom";

function Login(): JSX.Element {

    const {register, handleSubmit} = useForm<CredentialsModel>();

    const redirect = useNavigate();

    const submit = async (credentials: CredentialsModel) => {
        try {
            const user = await authService.login(credentials);
            redirect("/board");
        }
        catch(err: any) {
            console.error(err.message);
        }
    }

    return (
        <div className="Login">
			<h2>LOGIN</h2>
            <form onSubmit={handleSubmit(submit)}>
                <label>Username: </label>
                <input type="text" {...register("username", {
                    required: {value: true, message: "Required"}
                })} />

                <label>Password: </label>
                <input type="password" {...register("password", {
                    required: {value: true, message: "Required"}
                })} />

                <div className="button-section">
                    <button type="submit" className="btn-success">Login</button>
                    <button type="button" className="btn-error">Clear</button>
                </div>
            </form>
        </div>
    );
}

export default Login;
