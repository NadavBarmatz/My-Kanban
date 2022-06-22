import { useEffect, useState } from "react";
import "./Clock.css";

function Clock(): JSX.Element {

    const [clock, setClock] = useState<string>(new Date().toLocaleTimeString());

    useEffect(()=>{
        let intervalId: number;
        (async()=>{
            intervalId = window.setInterval(()=>{
                setClock(new Date().toLocaleTimeString());
            }, 1000)
        })();

        return ()=>{window.clearInterval(intervalId)}
    }, [])

    return (
        <div className="Clock">
			<p>{clock}</p>
        </div>
    );
}

export default Clock;
