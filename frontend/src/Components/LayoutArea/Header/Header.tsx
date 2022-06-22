import Clock from "../../Clock/Clock";
import "./Header.css";

interface HeaderProps {
    children: JSX.Element
}

const Header = (props: HeaderProps): JSX.Element => {

    return (
        <div className="Header">
            {props.children}
            <Clock />
        </div>
    );
}

export default Header;
