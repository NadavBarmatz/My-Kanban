import MainBoard from "../../MainArea/MainBoard/MainBoard";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Navigator from "../Navbar/Navigator/Navigator";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
			<header>
                <Header></Header>
            </header>
            <nav>
                <Navigator></Navigator>
            </nav>
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
