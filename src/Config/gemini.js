// import {
//     GoogleGenerativeAI,
//     HarmCategory,
//     HarmBlockThreshold,
// } from "@google/generative-ai";

// // Hardcoded API Key (Note: Do NOT hardcode in production)
// const apiKey = "AIzaSyA8mUziDgKFAhBYMvEKAoahvrneAr7C1W0";

// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//     model: "gemini-1.5-flash",
// });

// const generationConfig = {
//     temperature: 1,
//     topP: 0.95,
//     topK: 64,
//     maxOutputTokens: 8192,
//     responseMimeType: "text/plain",
// };

// export const run = async (prompt) => {
//     try {
//         const chatSession = model.startChat({
//             generationConfig,
//             history: [],
//         });

//         const result = await chatSession.sendMessage(prompt);
//         return result.response.text;
//     } catch (error) {
//         console.error("Error fetching response from Gemini:", error);
//         return "An error occurred. Please try again later.";
//     }
// };



// export default run;  // Default export

import { GoogleGenerativeAI } from "@google/generative-ai";

// Hardcoded API Key (Note: Do NOT hardcode in production)
const apiKey = "AIzaSyA8mUziDgKFAhBYMvEKAoahvrneAr7C1W0";

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

// Function to run the prompt and return the result
export const run = async (prompt) => {
    try {
        const chatSession = model.startChat({
            generationConfig,
            history: [],
        });

        // Fetch the result from the Gemini API
        const result = await chatSession.sendMessage(prompt);
        const response=result.response;
        console.log(response.text());
        

        // Return the result properly (this should be the API response)
        return response.text;  // Ensure you're returning the actual result object
    } catch (error) {
        console.error("Error fetching response from Gemini:", error);
        return { error: "API error" };  // Return an error object in case of failure
    }
};

export default run;
