import React, { useState, useRef, useEffect } from "react";
import "./CanvasPage.css";
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
  FaComments, // Import Chat Icon
} from "react-icons/fa";

function CanvasPage() {
  const [isChatOpen, setIsChatOpen] = useState(false); // Track chat visibility
  const [isDrawing, setIsDrawing] = useState(false);
  const [isPencilActive, setIsPencilActive] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#000000"); // Default color is black
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const colorPickerRef = useRef(null); // Ref for hidden color input
  const undoStack = useRef([]); // Stack to store canvas states for undo
  const redoStack = useRef([]); // Stack to store states for redo

  // Initialize canvas context on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.lineWidth = 5;
    context.strokeStyle = selectedColor; // Set initial color
    contextRef.current = context;
    saveCanvasState(); // Save the initial blank state for undo
  }, []);

  // Save current canvas state to the undo stack
  const saveCanvasState = () => {
    const canvas = canvasRef.current;
    undoStack.current.push(canvas.toDataURL());
    redoStack.current = []; // Clear redo stack after new action
  };

  // Undo the last action
  const handleUndo = () => {
    if (undoStack.current.length > 1) {
      redoStack.current.push(undoStack.current.pop()); // Move last state to redo stack
      const previousState = undoStack.current[undoStack.current.length - 1];
      restoreCanvasState(previousState);
    }
  };

  // Redo the last undone action
  const handleRedo = () => {
    if (redoStack.current.length > 0) {
      const redoState = redoStack.current.pop();
      undoStack.current.push(redoState);
      restoreCanvasState(redoState);
    }
  };

  // Restore canvas state from a data URL
  const restoreCanvasState = (state) => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    const img = new Image();
    img.src = state;
    img.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0);
    };
  };

  // Start drawing on mousedown
  const startDrawing = ({ nativeEvent }) => {
    if (!isPencilActive && !isErasing) return; // Only start if pencil or eraser is active
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  // Draw on canvas on mousemove
  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = nativeEvent;

    if (isErasing) {
      // Increase eraser size for faster erasing
      const eraserSize = 20;
      contextRef.current.clearRect(
        offsetX - eraserSize / 2,
        offsetY - eraserSize / 2,
        eraserSize,
        eraserSize
      );
    } else {
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
    }
  };

  // Stop drawing on mouseup or mouseleave
  const stopDrawing = () => {
    if (!isDrawing) return;
    contextRef.current.closePath();
    setIsDrawing(false);
    saveCanvasState(); // Save the canvas state after each drawing action
  };

  // Handle pencil tool selection
  const handlePencilClick = () => {
    setIsPencilActive(true);
    setIsErasing(false);
    contextRef.current.strokeStyle = selectedColor; // Set drawing color
  };

  // Handle eraser tool selection
  const handleEraserClick = () => {
    setIsPencilActive(false);
    setIsErasing(true);
  };

  // Open color picker on palette click
  const handlePaletteClick = () => {
    colorPickerRef.current.click(); // Programmatically open color picker
  };

  // Handle color change from color picker
  const handleColorChange = (event) => {
    const newColor = event.target.value;
    setSelectedColor(newColor);
    contextRef.current.strokeStyle = newColor; // Update context stroke style with new color
  };

  // Download canvas as an image
  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png"); // Get the canvas content as PNG
    link.download = "canvas_image.png"; // Specify the file name
    link.click(); // Trigger download
  };

  // **New function to save the current work as a file**
  const handleSave = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png"); // Save the canvas as a PNG file
    link.download = "saved_canvas.png"; // Set file name to 'saved_canvas.png'
    link.click(); // Trigger download
  };

  // Toggle chat visibility
  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <button className="sidebar-btn" onClick={handleUndo}>
          <FaUndo /> {/* Undo Icon */}
        </button>
        <button className="sidebar-btn" onClick={handleRedo}>
          <FaRedo /> {/* Redo Icon */}
        </button>
        <button className="sidebar-btn" onClick={handlePencilClick}>
          <FaPencilAlt /> {/* Pencil Icon */}
        </button>
        <button className="sidebar-btn" onClick={handlePaletteClick}>
          <FaPalette /> {/* Color Palette Icon */}
        </button>

        {/* Hidden Color Picker */}
        <input
          type="color"
          ref={colorPickerRef}
          style={{ display: "none" }}
          value={selectedColor}
          onChange={handleColorChange}
        />

        <button className="sidebar-btn">
          <FaBars />
        </button>
        <button className="sidebar-btn">
          <FaFileAlt />
        </button>
        <button className="sidebar-btn">
          <FaMountain />
        </button>
        <button className="sidebar-btn" onClick={handleEraserClick}>
          <FaSquare /> {/* Eraser Icon */}
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
        <button className="sidebar-btn" onClick={handleDownload}>
          <FaDownload /> {/* Download Icon */}
        </button>
        <button className="sidebar-btn" onClick={toggleChat}>
          <FaComments /> {/* Chat Icon */}
        </button>
        <button className="sidebar-btn" onClick={handleSave}>
          <FaFolder /> {/* Save Icon */}
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <canvas
          ref={canvasRef}
          className={`canvas ${
            isPencilActive
              ? "draw-cursor"
              : isErasing
              ? "eraser-cursor"
              : "default-cursor"
          }`}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
      </div>

      {/* Chat Component */}
      {isChatOpen && (
        <div className="chat-container full-screen">
          <div className="chat-header" onClick={toggleChat}>
            Chat
          </div>
          <div className="chat-box"> {/* Chat messages here */}</div>
          <div className="chat-input">
            <input type="text" placeholder="Type a message..." />
            <button className="send-btn">Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CanvasPage;
