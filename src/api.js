import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize GoogleGenerativeAI with your API key
const genAI = new GoogleGenerativeAI("AIzaSyB7Fwv3wopUfQ3cNAIemHYkknuxQNbz0SE");

/**
 * Sends a text question to the Gemini API and returns the response.
 * @param {string} input - The text input to be sent to the API.
 * @returns {Promise<string>} - The response from the API.
 */
async function sendTextToGemini(input) {
    try {
        // Specify the model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Generate content
        const result = await model.generateContent(input);
        return result.response.text(); // Return the text response from Gemini
    } catch (error) {
        console.error("Failed to send text to Gemini:", error);
        return 'Error processing the request. Please try again.';
    }
}

/**
 * Sends an image to the Gemini API for processing.
 * This function assumes you will first extract text from the image using OCR.
 * @param {string} imageText - The text extracted from the image.
 * @returns {Promise<string>} - The response from the API.
 */
async function sendImageToGemini(imageText) {
    // You can modify this to give context about what the image contains if necessary
    const input = `I need help solving this equation: ${imageText}`;
    return await sendTextToGemini(input);
}

// Export the functions for use in other modules
export { sendTextToGemini, sendImageToGemini };

// Example usage
async function exampleUsage() {
    const response = await sendTextToGemini("Explain how AI works");
    console.log(response);
}

// Call the example function to test
exampleUsage();







// Import GoogleGenerativeAI as an ES module
// import { GoogleGenerativeAI } from "@google/generative-ai";

// // Initialize GoogleGenerativeAI with your API key
// const genAI = new GoogleGenerativeAI("AIzaSyB7Fwv3wopUfQ3cNAIemHYkknuxQNbz0SE");

// // Wrap in an async function to use await
// async function generateResponse() {
//   try {
//     // Specify the model
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     // Define the prompt
//     const prompt = "Explain how AI works";

//     // Generate content
//     const result = await model.generateContent(prompt);
//     console.log(result.response.text());
//   } catch (error) {
//     console.error("Error generating response:", error);
//   }
// }

// // Call the async function
// generateResponse();
