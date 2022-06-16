import "./Login.css";
import { useForm } from "react-hook-form"
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import { Link, useNavigate } from "react-router-dom";

function Login(): JSX.Element {

    const {register, handleSubmit, reset, formState} = useForm<CredentialsModel>();

    const redirect = useNavigate();

    const submit = async (credentials: CredentialsModel) => {
        try {
            await authService.login(credentials);
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
                    required: {value: true, message: "Required"},
                    minLength: {value: 2, message: "Must be 2-15 chars"}
                })} />
                <span>{formState.errors.username?.message}</span>

                <label>Password: </label>
                <input type="password" {...register("password", {
                    required: {value: true, message: "Required"},
                    minLength: {value: 4, message: "Password must be minimum 4 chars"}
                })} />
                <span>{formState.errors.password?.message}</span>

                <div className="button-section">
                    <button type="submit" className="btn-success">Login</button>
                    <button type="button" className="btn-error" onClick={()=>{reset({username: "", password: ""})}}>Clear</button>
                </div>
            <p className="warning">No account? <Link to="/register">register</Link></p>
            </form>
        </div>
    );
}

export default Login;
