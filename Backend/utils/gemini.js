import dotenv from "dotenv";
import fetch from "node-fetch";


dotenv.config();


const url = `${process.env.GEN_API_URL}?key=${process.env.GEN_API_KEY}`;


const geminiResponse = async (message) => {
    console.log("Prompt:", message);
    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [
                {
                    role: "user",
                    parts: [
                        { text: message }
                    ],
                },
            ],
        }),
    }

    try{
        const response = await fetch(url, options);
        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error("Error:", error);
    }
}


export default geminiResponse;