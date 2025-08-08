import "./Sidebar.css"

export default function Sidebar() {
    // Sample history data - replace with your database data
    const historyItems = [
        "How to create React components",
        "Best practices for CSS animations",
        "JavaScript array methods explained",
        "Node.js backend development",
        "Database design principles",
        "API integration techniques",
        "Responsive web design tips",
        "Performance optimization guide",
        "Security best practices",
        "Testing strategies overview"
    ];

    return (
        <section className="sidebar">
            {/* New chat button - Fixed at top */}
            <div className="sidebar-header">
                <button className="new-chat-btn">
                    <div className="btn-content">
                        <img src="src/assets/logo.jpeg" alt="logo" className="logo"/>
                        <span className="btn-text">New Chat</span>
                    </div>
                    <i className="fa-solid fa-pen-to-square new-chat-icon"></i>
                </button>
            </div>

            {/* History - Scrollable middle section */}
            <div className="history-container">
                <div className="history-header">
                    <h3>Recent Chats</h3>
                </div>
                <ul className="history">
                    {historyItems.map((item, index) => (
                        <li key={index} className="history-item">
                            <div className="history-content">
                                <i className="fa-regular fa-message history-icon"></i>
                                <span className="history-text">{item}</span>
                            </div>
                            <div className="history-actions">
                                <button className="action-btn delete-btn" title="Delete">
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Sign - Fixed at bottom */}
            <div className="sidebar-footer">
                <div className="sign">
                    <div className="creator-info">
                        <div className="avatar">
                            <i className="fa-solid fa-user"></i>
                        </div>
                        <div className="creator-details">
                            <p className="creator-name">Developed By SaiRam</p>
                            <p className="creator-title"></p>
                        </div>
                    </div>
                    <button className="settings-btn" title="Settings">
                        <i className="fa-solid fa-cog"></i>
                    </button>
                </div>
            </div>
        </section>
    );
}