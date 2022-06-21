import AuthMenu from "../../../AuthArea/AuthMenu/AuthMenu";
import Navigator from "../Navigator/Navigator";
import "./RegularNavigator.css";

function RegularNavigator(): JSX.Element {
    return (
        <div className="RegularNavigator">
			<h2>LOGO</h2>
            <Navigator />
            <AuthMenu />
        </div>
    );
}

export default RegularNavigator;
