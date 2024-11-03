// import React, { useState, useRef, useEffect } from 'react';
// import { sendTextToGemini, sendImageToGemini } from './api.js'; // Import Gemini API functions
// import 'cropperjs/dist/cropper.css';
// import Cropper from 'cropperjs';
// ç
// const MathSolverPopup = () => {
//     const [inputText, setInputText] = useState('');
//     const [chatMessages, setChatMessages] = useState([]);
//     const [cropper, setCropper] = useState(null);
//     const cropperImageRef = useRef(null);
//     const [selectionBoxStyle, setSelectionBoxStyle] = useState({});
//     const [selectionActive, setSelectionActive] = useState(false);
//     const [startCoords, setStartCoords] = useState({ x: 0, y: 0 });

//     const addMessageToChat = (message) => {
//         setChatMessages(prevMessages => [...prevMessages, message]);
//     };

//     const handleSend = async () => {
//         if (inputText) {
//             addMessageToChat("You: " + inputText);
//             const response = await sendTextToGemini(inputText);
//             addMessageToChat("Gemini: " + response);
//             setInputText('');
//         }
//     };

//     const handleCapture = () => {
//         initiateScreenCapture();
//     };

//     const initiateScreenCapture = () => {
//         setSelectionActive(true);
//     };

//     const startSelection = (event) => {
//         setStartCoords({ x: event.clientX, y: event.clientY });
//     };

//     const updateSelection = (event) => {
//         const width = event.clientX - startCoords.x;
//         const height = event.clientY - startCoords.y;

//         setSelectionBoxStyle({
//             display: 'block',
//             left: `${Math.min(startCoords.x, event.clientX)}px`,
//             top: `${Math.min(startCoords.y, event.clientY)}px`,
//             width: `${Math.abs(width)}px`,
//             height: `${Math.abs(height)}px`,
//         });
//     };

//     const finishSelection = async (event) => {
//         setSelectionActive(false);
//         const selectedArea = {
//             x: Math.round(parseInt(selectionBoxStyle.left)),
//             y: Math.round(parseInt(selectionBoxStyle.top)),
//             width: Math.round(parseInt(selectionBoxStyle.width)),
//             height: Math.round(parseInt(selectionBoxStyle.height)),
//         };

//         await captureScreen(selectedArea);
//         setSelectionBoxStyle({ display: 'none' });
//     };

//     const captureScreen = async (selectedArea) => {
//         try {
//             const screenshot = await chrome.tabs.captureVisibleTab(null, { format: 'png' });
//             const image = new Image();
//             image.src = screenshot;

//             image.onload = () => {
//                 const canvas = document.createElement('canvas');
//                 canvas.width = selectedArea.width;
//                 canvas.height = selectedArea.height;
//                 const context = canvas.getContext('2d');

//                 context.drawImage(
//                     image,
//                     selectedArea.x,
//                     selectedArea.y,
//                     selectedArea.width,
//                     selectedArea.height,
//                     0,
//                     0,
//                     selectedArea.width,
//                     selectedArea.height
//                 );

//                 const base64Image = canvas.toDataURL('image/png').split(',')[1];
//                 addMessageToChat("You selected an area for image capture.");
//                 sendImageToGemini(base64Image).then(response => {
//                     addMessageToChat("Gemini: " + response);
//                 });
//             };
//         } catch (error) {
//             console.error('Error capturing screen:', error);
//             addMessageToChat('Error capturing the screen. Please try again.');
//         }
//     };

//     return (
//         <div style={{ width: '320px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', color: '#333' }}>
//             <h1 style={{ fontSize: '24px', textAlign: 'center', color: '#4CAF50' }}>Math Solver</h1>
//             <div id="chatContainer" style={{ height: '300px', overflowY: 'auto', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', backgroundColor: '#fff', marginBottom: '10px', display: 'flex', flexDirection: 'column' }}>
//                 {chatMessages.map((msg, index) => (
//                     <div key={index} className={msg.startsWith("You:") ? "user-message" : "gemini-message"}>
//                         {msg}
//                     </div>
//                 ))}
//             </div>
//             <div id="inputContainer" style={{ display: 'flex', marginBottom: '10px' }}>
//                 <textarea 
//                     value={inputText}
//                     onChange={e => setInputText(e.target.value)}
//                     placeholder="Type your question here..."
//                     style={{ flexGrow: 1, border: '1px solid #ccc', borderRadius: '5px', padding: '10px', resize: 'none', fontSize: '14px' }} 
//                 />
//                 <button onClick={handleSend} style={buttonStyle}>Send</button>
//                 <button onClick={handleCapture} style={buttonStyle}>Capture</button>
//             </div>
//             {selectionActive && (
//                 <div
//                     id="selectionOverlay"
//                     onMouseDown={startSelection}
//                     onMouseMove={updateSelection}
//                     onMouseUp={finishSelection}
//                     style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10 }}
//                 >
//                     <div style={{
//                         ...selectionBoxStyle,
//                         position: 'absolute',
//                         backgroundColor: 'rgba(255, 255, 255, 0.5)',
//                         border: '2px dashed #4CAF50',
//                         pointerEvents: 'none'
//                     }} />
//                 </div>
//             )}
//             <div id="cropperContainer" style={{ display: 'none', position: 'relative', marginTop: '10px' }}>
//                 <img ref={cropperImageRef} id="cropperImage" src="" alt="Image for cropping" style={{ maxWidth: '100%' }} />
//             </div>
//         </div>
//     );
// };

// // Define button styles
// const buttonStyle = {
//     padding: '10px 15px',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     fontSize: '14px',
//     marginLeft: '5px',
//     backgroundColor: '#4CAF50',
//     color: 'white',
//     transition: 'background-color 0.3s ease'
// };

// export default MathSolverPopup;










import React, { useState } from 'react';
import { sendTextToGemini } from './api'; // Adjust the import based on your file structure
import './MathSolverPopup.css'; // Assuming you have a CSS file for styles

const MathSolverPopup = () => {
  const [inputText, setInputText] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const handleSend = async () => {
    if (inputText) {
      addMessageToChat("You: " + inputText);
      const response = await sendTextToGemini(inputText);
      addMessageToChat("Gemini: " + response);
      setInputText(''); // Clear input after sending
    }
  };

  const addMessageToChat = (message) => {
    setChatMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <div>
      <h1>Math Solver</h1>
      <div id="chatContainer">
        {chatMessages.map((msg, index) => (
          <div key={index} className={msg.startsWith("You:") ? 'user-message' : 'gemini-message'}>
            {msg}
          </div>
        ))}
      </div>
      <div id="inputContainer">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your question here..."
        />
        <button onClick={handleSend}>Send</button>
        {/* Capture button removed since we're not using it */}
      </div>
    </div>
  );
};

export default MathSolverPopup;
