import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { GoogleGenAI } from "@google/genai";

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const ai = new GoogleGenAI({
  apiKey: "AIzaSyC-bkCPjlyvhNh5SJ0pzHdYwSSUdinkGbM",
});

app.post("/api/prompt", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "No prompt provided" });
  }

  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    res.json({ reply: result.text });
  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

app.listen(port, () => {
  console.log(`🚀 Backend running at http://localhost:${port}`);
});
