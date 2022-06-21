import MainBoard from "../../MainArea/MainBoard/MainBoard";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import RegularNavigator from "../Navbar/RegularNavigator/RegularNavigator";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
            <nav>
                <RegularNavigator />
            </nav>
			<header>
                <Header></Header>
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
