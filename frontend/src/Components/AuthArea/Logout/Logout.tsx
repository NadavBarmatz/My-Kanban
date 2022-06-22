import { useEffect } from "react";
import authStore from "../../../MOBX/AuthStore";
import { useNavigate } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";

function Logout(): JSX.Element {

    const redirect = useNavigate();

    useEffect(()=>{
        authStore.logout();
        notifyService.success("You have been successfully logged out");
        redirect('/login');
    }, [])

    return (
        <>
        </>
    );
}

export default Logout;
