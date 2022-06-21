import { observer } from "mobx-react";
import todoStore from "../../../MOBX/TodoStore";
import "./Header.css";

const Header = observer((): JSX.Element => {

    return (
        <div className="Header">
			<h1>Tasks</h1>
            <div className="task-count">
                <div className="pending">
                    <h2>{todoStore.pendingCount} </h2>
                    <p>pending</p>
                </div>
                <div className="progress">
                    <h2>{todoStore.inProgressCount} </h2>
                    <p>in progress</p>
                </div>
                <div className="waiting">
                    <h2>{todoStore.waitingCount} </h2>
                    <p>waiting</p>
                </div>
                <div className="completed">
                    <h2>{todoStore.completedCount} </h2>
                    <p>completed</p>
                </div>
            </div>
        </div>
    );
})

export default Header;
