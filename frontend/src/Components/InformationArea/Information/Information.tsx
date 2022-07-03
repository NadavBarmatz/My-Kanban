import "./Information.css";

function Information(): JSX.Element {
    return (
        <div className="Information">
            <p>This project is a demonstration only,</p>
            <p>There for the task board is open for all logged in users.</p>
            <p>Please do not write any sensitive information.</p>
            <br />
            <p>The registration is working and passwords are hashed in the Database. Feel free to check it out.</p>
            <br /><br />
            <p >Users in available for login:</p>
			<p>User Credentials:</p>
            <ul>
                <li>Username: user</li>
                <li>Password: 1234</li>
            </ul>
            <br />
			<p>Admin Credentials:</p>
            <ul>
                <li>Username: admin</li>
                <li>Password: 1234</li>
            </ul>
        </div>
    );
}

export default Information;
