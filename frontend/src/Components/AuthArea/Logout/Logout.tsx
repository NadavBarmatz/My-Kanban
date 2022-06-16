import { useEffect } from "react";
import authStore from "../../../MOBX/AuthStore";
import { useNavigate } from "react-router-dom";

function Logout(): JSX.Element {

    const redirect = useNavigate();

    useEffect(()=>{
        authStore.logout();
        redirect('/login');
    }, [])

    return (
        <>
        </>
    );
}

export default Logout;
