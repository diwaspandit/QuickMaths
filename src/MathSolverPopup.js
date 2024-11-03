import React, { useState, useRef, useEffect } from 'react';
import { sendToGemini } from './api.js';
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';

const MathSolverPopup = () => {
    const [inputText, setInputText] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [cropper, setCropper] = useState(null);
    const cropperImageRef = useRef(null);
    const [imageSrc, setImageSrc] = useState('');
    const [selectionActive, setSelectionActive] = useState(false);
    const [selectionBoxStyle, setSelectionBoxStyle] = useState({});
    const [startCoords, setStartCoords] = useState({ x: 0, y: 0 });

    const addMessageToChat = (message) => {
        setChatMessages(prevMessages => [...prevMessages, message]);
    };

    const handleSend = async () => {
        let response;
        if (inputText) {
            addMessageToChat("You: " + inputText);
            if (imageSrc) {
                response = await sendToGemini(imageSrc); // Send cropped image
            } else {
                response = await sendToGemini(inputText); // Send text only
            }
            addMessageToChat("Gemini: " + response);
            setInputText('');
        }
    };

    const handleCapture = () => {
        initiateScreenCapture();
    };

    const initiateScreenCapture = () => {
        setSelectionActive(true);
        captureScreen();
    };

    const captureScreen = async () => {
        try {
            const screenshot = await chrome.tabs.captureVisibleTab(null, { format: 'png' });
            setImageSrc(screenshot); // Set the image source for Cropper
        } catch (error) {
            console.error('Error capturing screen:', error);
            addMessageToChat('Error capturing the screen. Please try again.');
        }
    };

    useEffect(() => {
        if (cropperImageRef.current && imageSrc) {
            const newCropper = new Cropper(cropperImageRef.current, {
                aspectRatio: 16 / 9,
                viewMode: 1,
                autoCropArea: 1,
            });
            setCropper(newCropper);
        }
        return () => {
            if (cropper) {
                cropper.destroy();
            }
        };
    }, [imageSrc]);

    const finishSelection = () => {
        setSelectionActive(false);
        getCroppedImage();
    };

    const getCroppedImage = () => {
        if (cropper) {
            const canvas = cropper.getCroppedCanvas();
            canvas.toBlob(blob => {
                const reader = new FileReader();
                reader.onloadend = function() {
                    const base64Image = reader.result.split(',')[1];
                    setImageSrc(base64Image); // Set the base64 image
                    addMessageToChat("Image ready for processing.");
                };
                reader.readAsDataURL(blob);
            });
        }
    };

    const startSelection = (event) => {
        setStartCoords({ x: event.clientX, y: event.clientY });
    };

    const updateSelection = (event) => {
        const width = event.clientX - startCoords.x;
        const height = event.clientY - startCoords.y;

        setSelectionBoxStyle({
            display: 'block',
            left: `${Math.min(startCoords.x, event.clientX)}px`,
            top: `${Math.min(startCoords.y, event.clientY)}px`,
            width: `${Math.abs(width)}px`,
            height: `${Math.abs(height)}px`,
        });
    };

    return (
        <div style={{ width: '320px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', color: '#333' }}>
            <h1 style={{ fontSize: '24px', textAlign: 'center', color: '#4CAF50' }}>Math Solver</h1>
            <div id="chatContainer" style={{ height: '300px', overflowY: 'auto', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', backgroundColor: '#fff', marginBottom: '10px', display: 'flex', flexDirection: 'column' }}>
                {chatMessages.map((msg, index) => (
                    <div key={index} className={msg.startsWith("You:") ? "user-message" : "gemini-message"}>
                        {msg}
                    </div>
                ))}
            </div>
            <div id="inputContainer" style={{ display: 'flex', marginBottom: '10px' }}>
                <textarea 
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    placeholder="Type your question here..."
                    style={{ flexGrow: 1, border: '1px solid #ccc', borderRadius: '5px', padding: '10px', resize: 'none', fontSize: '14px' }} 
                />
                <button onClick={handleSend} style={buttonStyle}>Send</button>
                <button onClick={handleCapture} style={buttonStyle}>Capture</button>
            </div>
            {imageSrc && (
                <div id="cropperContainer" style={{ display: 'block', position: 'relative', marginTop: '10px' }}>
                    <img ref={cropperImageRef} src={imageSrc} alt="" style={{ maxWidth: '100%' }} />
                    {selectionActive && (
                        <div
                            onMouseDown={startSelection}
                            onMouseMove={updateSelection}
                            onMouseUp={finishSelection}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                zIndex: 10
                            }}
                        >
                            <div style={{
                                ...selectionBoxStyle,
                                position: 'absolute',
                                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                border: '2px dashed #4CAF50',
                                pointerEvents: 'none'
                            }} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

// Define button styles
const buttonStyle = {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    marginLeft: '5px',
    backgroundColor: '#4CAF50',
    color: 'white',
    transition: 'background-color 0.3s ease'
};

export default MathSolverPopup;
