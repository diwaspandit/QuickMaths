import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize GoogleGenerativeAI with your API key
const genAI = new GoogleGenerativeAI("");

/**
 * Sends text and/or image to the Gemini API and returns the response as text.
 * @param {string} [inputText] 
 * @param {string} [base64Image] 
 * @returns {Promise<string>}
 */
async function sendToGemini(inputText = "", base64Image = "") {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Prepare the prompt and image in the required format
        const prompt = inputText || "Please analyze this image.";
        let image = base64Image ? { 
            inlineData: {
                data: base64Image.split(',')[1], // Strip the prefix
                mimeType: "image/png",
            },
        } : undefined;

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

