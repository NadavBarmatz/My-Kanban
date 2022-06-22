import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import authStore from "../../../MOBX/AuthStore";
import "./AuthMenu.css";

const AuthMenu = observer((): JSX.Element => {
    
    return (
        <div className="AuthMenu">
			{
                authStore.user ? 
                <>
                    <span>Hello {authStore.user.username} | </span> 
                    <Link to="/logout">Logout</Link>
                </>
                :
                <>
                    <span>Hello Guest | </span>
                    <Link to="/login">Login</Link>
                    <span> | </span>
                    <Link to="/register">Register</Link>
                </>
            }
            
        </div>
    );
})

export default AuthMenu;
