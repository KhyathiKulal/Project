import React, { useState } from "react";
import "./CanvasPage.css"; // Import CSS for styling
import {
  FaUndo,
  FaRedo,
  FaPencilAlt,
  FaPalette,
  FaBars,
  FaFileAlt,
  FaMountain,
  FaSquare,
  FaImage,
  FaLaptop,
  FaArrowLeft,
  FaDownload,
  FaFolder,
} from "react-icons/fa"; // Import desired icons

function CanvasPage() {
  const [isChatOpen, setIsChatOpen] = useState(true);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <button className="sidebar-btn">
          <FaUndo /> {/* Undo Icon */}
        </button>
        <button className="sidebar-btn">
          <FaRedo /> {/* Redo Icon */}
        </button>
        <button className="sidebar-btn">
          <FaPencilAlt /> {/* Pencil Icon */}
        </button>
        <button className="sidebar-btn">
          <FaPalette /> {/* Color Palette Icon */}
        </button>
        <button className="sidebar-btn">
          <FaBars />
        </button>
        <button className="sidebar-btn">
          <FaFileAlt />
        </button>
        <button className="sidebar-btn">
          <FaMountain />
        </button>
        <button className="sidebar-btn">
          <FaSquare />
        </button>
        <button className="sidebar-btn">
          <FaImage />
        </button>
        <button className="sidebar-btn">
          <FaLaptop />
        </button>
        <button className="sidebar-btn">
          <FaArrowLeft />
        </button>
        <button className="sidebar-btn">
          <FaDownload />
        </button>
        <button className="sidebar-btn">
          <FaFolder />
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="chat-container">
          <div className="chat-header" onClick={toggleChat}>
            <span>💬 Chat</span>
            <button className="dropdown-btn">{isChatOpen ? "▼" : "▲"}</button>
          </div>
          {isChatOpen && (
            <div className="chat-box">
              {/* Chat messages can be rendered here */}
            </div>
          )}
          {isChatOpen && (
            <div className="chat-input">
              <input type="text" placeholder="Type a message..." />
              <button className="send-btn">➤</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CanvasPage;
