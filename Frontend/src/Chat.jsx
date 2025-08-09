import { useContext } from "react";
import { MyContext } from "./MyContext.jsx";
import TypingIndicator from "./TypingIndicator.jsx";

export default function Chat() {
    const { reply, loading } = useContext(MyContext);

    return (
        <div className="chat-messages">
            {reply && <div className="assistant-msg">{reply}</div>}
            {loading && <TypingIndicator />}
        </div>
    );
}
