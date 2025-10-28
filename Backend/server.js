// import {GoogleGenerativeAI} from "@google/generative-ai";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

dotenv.config();

const app = express();
app.use(express.json());
const port = 8000;

app.use(cors());
app.use(express.json());

// This is how we can use gemini from npm and teminal
// const genAI = new GoogleGenerativeAI(process.env.GEN_API_KEY);
// const prompt = "Do you know anything about me?";

// const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
// const result = await model.generateContent(prompt);
// console.log(result.response.text());




app.use('/api', chatRoutes);







const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB successfully!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
    connectDB();
})

