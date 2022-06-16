import "./Register.css";
import { useForm } from "react-hook-form";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import { useNavigate } from "react-router-dom";

function Register(): JSX.Element {

    const {register, handleSubmit, reset, formState} = useForm<UserModel>();
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
                    required: {value: true, message: "Required"},
                    minLength: {value: 3, message: "Must be 3-15 chars"}
                })} />
                <span>{formState.errors.firstName?.message}</span>

                <label>Last Name: </label>
                <input type="text" {...register("lastName", {
                    required: {value: true, message: "Required"},
                    minLength: {value: 3, message: "Must be 3-15 chars"}
                })} />
                <span>{formState.errors.lastName?.message}</span>

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

                <label>Title: </label>
                <input type="text" {...register("title", {
                    required: {value: true, message: "Required"}
                })} />
                <span>{formState.errors.title?.message}</span>

                <label>Email: </label>
                <input type="text" {...register("email", {
                    required: {value: true, message: "Required"}
                })} />
                <span>{formState.errors.email?.message}</span>

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
