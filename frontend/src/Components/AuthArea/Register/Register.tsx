import "./Register.css";
import { useForm } from "react-hook-form";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import { useNavigate } from "react-router-dom";

function Register(): JSX.Element {

    const {register, handleSubmit, reset} = useForm<UserModel>();
    const redirect = useNavigate();

    const submit = (user: UserModel) => {
        authService.register(user);
        redirect("/board")
        
    }

    return (
        <div className="Register">
			<h2>REGISTER</h2>
            <form onSubmit={handleSubmit(submit)}>
                <label>First Name: </label>
                <input type="text" {...register("firstName", {
                    required: {value: true, message: "Required"}
                })} />

                <label>Last Name: </label>
                <input type="text" {...register("lastName", {
                    required: {value: true, message: "Required"}
                })} />

                <label>Username: </label>
                <input type="text" {...register("username", {
                    required: {value: true, message: "Required"}
                })} />

                <label>Password: </label>
                <input type="password" {...register("password", {
                    required: {value: true, message: "Required"}
                })} />

                <label>Title: </label>
                <input type="text" {...register("title", {
                    required: {value: true, message: "Required"}
                })} />

                <label>Email: </label>
                <input type="text" {...register("email", {
                    required: {value: true, message: "Required"}
                })} />

                <div className="button-section">
                    <button type="submit" className="btn-success">Register</button>
                    <button type="button" className="btn-error" 
                        onClick={() => {reset({firstName: null, lastName: null, username: null, password: null, title: null, email: null})}}>
                            Clear
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Register;
