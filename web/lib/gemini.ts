import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("CRITICAL: GEMINI_API_KEY is missing in process.env");
} else {
  console.log("✅ API Key loaded. First 4 chars: " + apiKey.substring(0, 4));
}

export const genAI = new GoogleGenerativeAI(apiKey || "missing-key");

// Fallback to stable 1.0 pro model to test connection
export const model = genAI.getGenerativeModel({
  model: "gemini-1.0-pro",
  systemInstruction: "You are the central intelligence of Agência ROI POSITIVO."
});
