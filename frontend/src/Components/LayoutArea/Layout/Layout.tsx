import Footer from "../Footer/Footer";
import RegularNavigator from "../Navbar/RegularNavigator/RegularNavigator";
import Routing from "../Routing/Routing";
import "./Layout.css";
import HeaderRouting from "../Header/HeaderRouting/HeaderRouting";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
            <nav>
                <RegularNavigator />
            </nav>
			<header>
                <HeaderRouting></HeaderRouting>
            </header>
            <main>
                <Routing></Routing>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
}

export default Layout;
