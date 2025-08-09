import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext } from "react";

export default function ChatWindow() {
    const { prompt, setPrompt, reply, setReply, currThreadId, loading, setLoading } = useContext(MyContext);

    const getReply = async () => {
        if (!prompt.trim()) return;

        setLoading(true);

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: prompt,
                threadId: currThreadId
            })
        };

        try {
            const response = await fetch("http://localhost:8080/api/chat", options);
            const data = await response.json();
            console.log("API Response:", data);
            if (data.reply) {
                setReply(data.reply);
            }
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chatWindow">
            {/* Enhanced Navbar */}
            <div className="navbar">
                <div className="navbar-left">
                    <div className="model-selector">
                        <span className="model-name">Qurious
                            <i className="fa-solid fa-chevron-down dropdown-icon"></i>
                        </span>

                        <div className="model-dropdown">
                            <div className="dropdown-item active">
                                <div className="model-info">
                                    <span className="model-title">Qurious GPT-4</span>
                                    <span className="model-desc">Most capable model</span>
                                </div>
                                <i className="fa-solid fa-check"></i>
                            </div>
                            <div className="dropdown-item">
                                <div className="model-info">
                                    <span className="model-title">Qurious GPT-3.5</span>
                                    <span className="model-desc">Faster responses</span>
                                </div>
                            </div>
                            <div className="dropdown-item">
                                <div className="model-info">
                                    <span className="model-title">Qurious Vision</span>
                                    <span className="model-desc">Image understanding</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="navbar-right">
                    <button className="nav-btn share-btn" title="Share conversation">
                        <i className="fa-solid fa-share"></i>
                    </button>
                    <div className="userIconDiv">
                        <div className="user-avatar">
                            <i className="fa-solid fa-user"></i>
                        </div>
                        <div className="user-dropdown">
                            <div className="user-info">
                                <div className="user-details">
                                    <span className="user-name">SaiRam</span>
                                    <span className="user-email">sairam@example.com</span>
                                </div>
                            </div>
                            <hr className="dropdown-divider" />
                            <div className="dropdown-item">
                                <i className="fa-solid fa-cog"></i>
                                <span>Settings</span>
                            </div>
                            <div className="dropdown-item">
                                <i className="fa-solid fa-question-circle"></i>
                                <span>Help & FAQ</span>
                            </div>
                            <div className="dropdown-item logout">
                                <i className="fa-solid fa-sign-out-alt"></i>
                                <span>Log out</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="chat-container">
                <Chat />
            </div>

            {/* Enhanced Chat Input */}
            <div className="chatInput">
                <div className="input-container">
                    <div className="userInput">
                        <div className="input-wrapper">
                            <textarea
                                placeholder="Message Qurious..."
                                rows="1"
                                className="message-input"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" ? getReply() : ""}
                            ></textarea>
                            <div className="input-actions">
                                <button className="attach-btn" title="Attach file">
                                    <i className="fa-solid fa-paperclip"></i>
                                </button>
                                <button className="voice-btn" title="Voice input">
                                    <i className="fa-solid fa-microphone"></i>
                                </button>
                                <button
                                    className={`submit-btn ${loading ? "loading" : ""}`}
                                    id="submit"
                                    title="Send message"
                                    onClick={getReply}
                                    disabled={loading}
                                >
                                    {loading
                                        ? <div className="spinner"></div>
                                        : <i className="fa-solid fa-paper-plane"></i>}
                                </button>

                            </div>
                        </div>
                        <div className="input-footer">
                            <p className="info">
                                Qurious can make mistakes. Consider checking important information.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
