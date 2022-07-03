import { Routes, Route } from "react-router-dom";
import TaskCount from "../TaskCount/TaskCount";
import Header from "../Header";
import RegisterHeader from "../ReagisterHeader/RegisterHeader";
import LoginHeader from "../LoginHeader/LoginHeader";
import AboutUsHeader from "../AboutUs/AboutUsHeader";
import InformationHeader from "../InformationHeader/InformationHeader";

function HeaderRouting(): JSX.Element {
    return (
        <>
			<Routes>
                <Route path="/login" element={<Header><LoginHeader/></Header>} />
                <Route path="/register" element={<Header><RegisterHeader/></Header>} />
                <Route path="/information" element={<Header><InformationHeader/></Header>} />
                <Route path="/board" element={<Header><TaskCount/></Header>} />
                <Route path="/about" element={<Header><AboutUsHeader/></Header>} />
            </Routes>
        </>
    );
}

export default HeaderRouting;
