import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize GoogleGenerativeAI with your API key
const genAI = new GoogleGenerativeAI("AIzaSyB7Fwv3wopUfQ3cNAIemHYkknuxQNbz0SE");

/**
 
Sends text and/or image to the Gemini API and returns the response as text.
@param {string} [inputText] - The text input from the user (optional).
@param {string} [base64Image] - The base64-encoded image data (optional).
@returns {Promise<string>} - The text response from the API.*/
async function sendToGemini(inputText = "", base64Image = "") {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Prepare the prompt and image in the required format
        const prompt = inputText || "Please analyze this image.";
        const image = base64Image
            ? {
                  inlineData: {
                      data: base64Image,
                      mimeType: "image/png",
                  },
              }
            : undefined;

        // Combine prompt and image into an array as required by the API
        const input = image ? [prompt, image] : [prompt];

        // Generate content based on the combined input
        const result = await model.generateContent(input);
        return result.response.text(); // Return the text response from Gemini
    } catch (error) {
        console.error("Failed to send input to Gemini:", error);
        return 'Error processing the request. Please try again.';
    }
}

// Export the functions for use in other modules
export { sendToGemini };

// Example usage: To send either text or both text and image
// async function exampleUsage() {
//     const textResponse = await sendToGemini("Solve x + 5 = 10", "yourBase64EncodedImageDataHere");
//     console.log(textResponse);
// }