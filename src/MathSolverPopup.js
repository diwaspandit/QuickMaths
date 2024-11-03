import React, { useRef, useState, useEffect } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

// Import your API function
import { sendToGemini } from './api.js';

const MathSolverPopup = () => {
    const [inputText, setInputText] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const cropperImageRef = useRef(null);
    const [cropper, setCropper] = useState(null);
    const [imageSrc, setImageSrc] = useState('');
    const [showDesmos, setShowDesmos] = useState(false); // State to control Desmos visibility

    // Add messages to chat
    const addMessageToChat = (message) => {
        setChatMessages((prevMessages) => [...prevMessages, message]);
    };

    // Send input to the API
    const handleSend = async () => {
        let response;
        addMessageToChat("You: " + inputText);

        const formattedPrompt = `Please give the answer in proper output format. The output should be in new line. Provide the answer in a detailed format. Answer should be short and convincing: ${inputText}`;
        response = await sendToGemini(formattedPrompt, imageSrc);

        addMessageToChat("Guru: " + response);
        setInputText('');
    };

    // Capture the screen and set as image source
    const handleCapture = async () => {
        try {
            const screenshot = await chrome.tabs.captureVisibleTab(null, { format: 'png' });
            setImageSrc(screenshot);
        } catch (error) {
            console.error('Error capturing screen:', error);
            addMessageToChat('Error capturing the screen. Please try again.');
        }
    };

    // Download cropped image and send to API
    const downloadCroppedImage = () => {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob((blob) => {
                const url = URL.createObjectURL(blob);

                // Trigger download
                const a = document.createElement('a');
                a.href = url;
                a.download = 'cropped-image.png';
                a.click();

                // Convert to base64 and send to API
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64Image = reader.result.split(',')[1];
                    sendToGemini(inputText, base64Image);
                };
                reader.readAsDataURL(blob);
            }, 'image/png');
        }
    };

    // Initialize Cropper when imageSrc changes
    useEffect(() => {
        if (cropperImageRef.current && imageSrc) {
            // Destroy previous Cropper instance if exists
            if (cropper) cropper.destroy();

            // Create a new Cropper instance
            const newCropper = new Cropper(cropperImageRef.current, {
                aspectRatio: 16 / 9, // You can adjust the aspect ratio as needed
                viewMode: 1,
                autoCropArea: 1,
            });
            setCropper(newCropper);
        }

        // Cleanup Cropper on unmount
        return () => {
            if (cropper) cropper.destroy();
        };
    }, [imageSrc]);

    // Remove image and Cropper instance
    const removeImage = () => {
        setImageSrc('');
        if (cropper) {
            cropper.destroy();
            setCropper(null);
        }
    };

    // Toggle Desmos calculator visibility
    const toggleDesmos = () => {
        setShowDesmos(!showDesmos);
    };

    // Load Desmos API script
    useEffect(() => {
        if (showDesmos) {
            const script = document.createElement('script');
            script.src = 'https://www.desmos.com/api/v1.9/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6';
            script.onload = () => {
                const elt = document.getElementById('calculator');
                window.Desmos = window.Desmos || {};
                window.Desmos.GraphingCalculator(elt);
            };
            document.body.appendChild(script);
        }
    }, [showDesmos]);

    return (
        <div style={{ width: '320px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', color: '#333', position: 'relative' }}>
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
                <button onClick={toggleDesmos} style={buttonStyle}>Desmos</button>
            </div>
            {imageSrc && (
                <div id="cropperContainer" style={{ display: 'block', position: 'relative', marginTop: '10px' }}>
                    <img ref={cropperImageRef} src={imageSrc} alt="Crop Area" style={{ maxWidth: '100%' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                        <button onClick={downloadCroppedImage} style={buttonStyle}>Download Image</button>
                        <button onClick={removeImage} style={buttonStyle}>Remove Image</button>
                    </div>
                </div>
            )}
            {showDesmos && (
                <div id="calculator" style={{ width: '100%', height: '80%', position: 'absolute', top: '0', left: '0', backgroundColor: 'white', zIndex: '1000', border: '1px solid #ccc' }}></div>
            )}
        </div>
    );
};

// Button styling
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
