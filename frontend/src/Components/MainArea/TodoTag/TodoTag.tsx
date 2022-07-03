import "./TodoTag.css";

interface TodoTagProps {
	tagName: string;
}

function TodoTag(props: TodoTagProps): JSX.Element {
    return (
        <div className="TodoTag">
			<p>{props.tagName}</p>
        </div>
    );
}

export default TodoTag;
