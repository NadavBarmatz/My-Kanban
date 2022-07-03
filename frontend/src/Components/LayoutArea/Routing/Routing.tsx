import { observer } from "mobx-react";
import { Navigate, Route, Routes } from "react-router-dom";
import authStore from "../../../MOBX/AuthStore";
import AboutUs from "../../AboutArea/AboutUs/AboutUs";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Register from "../../AuthArea/Register/Register";
import Information from "../../InformationArea/Information/Information";
import MainBoard from "../../MainArea/MainBoard/MainBoard";
import Page404 from "../Page404/Page404";

const Routing = observer((): JSX.Element => {
    return (
        <>
			<Routes>
                <Route path="/information" element={<Information />} />
                <Route path="/board" element={authStore.isLoggedIn ? <MainBoard /> : <Navigate to="/information" />} />
                <Route path="/about" element={<AboutUs />} />
                {/* Auth routes */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />

                {/* Fallback routes */}
                <Route path="/" element={<Navigate to="/board" />}  />
                <Route path="*" element={<Page404 />}  />
            </Routes>
        </>
    );
})

export default Routing;
