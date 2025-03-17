import dotenv from "dotenv";
dotenv.config();
import * as fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

async function run() {
  // Use the multimodal gemini-pro-vision model
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt =
    "Analyze this mathematical image. Identify any equations, explain what they mean, and provide context about their significance in mathematics.";

  // Use the pythagoras.jpg image that's already in your workspace
  const imageParts = [fileToGenerativePart("pythagoras.jpg", "image/jpeg")];

  console.log("Analyzing mathematical image...");
  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();
