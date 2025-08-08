import "./ChatWindow.css"
import Chat from "./Chat.jsx"

export default function ChatWindow() {
    return (
        <div className="chatWindow">
            <div className="navbar">
                <span>Qurious &nbsp;<i class="fa-solid fa-chevron-down"></i></span>
                <div className="userIconDiv">
                    <span>
                        <i class="fa-solid fa-user"></i>
                    </span>
                </div>
            </div>
            <Chat></Chat>
            <div className="chatInput">
                <div className="userInput">
                    <input type="text" placeholder="Ask Anything" />
                    <div id="submit"><i class="fa-solid fa-paper-plane"></i></div>
                    <p className="info">Quiros can make mistakes. </p>
                </div>
            </div>
        </div>
    )
}