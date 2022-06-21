import { Link } from "react-router-dom";
import "./Navigator.css";

function Navigator(): JSX.Element {
    return (
        <div className="Navigator">
			<Link to="/board">Todo Board</Link>
			<Link to="#">LINK 2</Link>
			<Link to="#">LINK 3</Link>
			<Link to="#">LINK 4</Link>
        </div>
    );
}

export default Navigator;
