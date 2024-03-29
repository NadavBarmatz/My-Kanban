import { Link } from "react-router-dom";
import "./Navigator.css";

function Navigator(): JSX.Element {
    return (
        <div className="Navigator">
			<Link to="/information">Information</Link>
			<Link to="/board">Todo Board</Link>
			<Link to="#">LINK 3</Link>
			<Link to="about">About Us</Link>
        </div>
    );
}

export default Navigator;
