import express from 'express';
import Thread from '../models/Thread.js';
import geminiResponse from '../utils/gemini.js';

const router = express.Router();

// Create a new chat thread
router.post('/test', async (req, res) => {
    try {
        const thread = new Thread({
            threadId: "oijfifc",
            title: "Sample for testing673",
        })
        const response = await thread.save();
        res.json(response);
    } catch (error) {
        console.error("Error creating thread:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// Get all chat threads
router.get('/threads', async (req, res) => {
    try {
        const threads = await Thread.find({}).sort({ updatedAt: -1 });
        // descending order of updatedAt --- most recent data on top
        res.json(threads);
    } catch (error) {
        console.error("Error fetching threads:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// Get chat messages for a specific thread
router.get('/threads/:threadId', async (req, res) => {
    const { threadId } = req.params;
    try {
        const thread = await Thread.findOne({ threadId });
        if (!thread) {
            return res.status(404).json({ error: "Thread not found" });
        }
        res.json(thread.messages);
    } catch (error) {
        console.error("Error fetching thread:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



// Delete a chat thread
router.delete('/threads/:threadId', async (req, res) => {
    const { threadId } = req.params;
    try {
        const thread = await Thread.findOneAndDelete({ threadId });
        if (!thread) {
            return res.status(404).json({ error: "Thread not found" });
        }
        res.json({ message: "Thread deleted successfully" });
    } catch (error) {
        console.error("Error deleting thread:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



// New message to existing chat thread or a new chat thread
router.post('/chat', async (req, res) => {
    const { threadId, message } = req.body;

    // console.log("Received message:", message, "for thread ID:", threadId);

    if (!threadId || !message) {
        return res.status(400).json({ error: "Fields are required" });
    }

    try {
        let thread = await Thread.findOne({ threadId });
        if (!thread) {
            thread = new Thread({
                threadId,
                title: message,
                messages: [{
                    role: "user",
                    content: message
                }]
            });
        } else {
            thread.messages.push({
                role: "user",
                content: message
            });
        }


        const geminiReply = await geminiResponse(message);
        console.log("Gemini Reply:", geminiReply);

        thread.messages.push({
            role: "assistant",
            content: geminiReply
        });
        thread.updatedAt = Date.now();

        await thread.save();
        res.json({ reply: geminiReply });
    } catch (error) {
        console.error("Error adding message:", error);
        res.status(500).json({ error: "Internal server error" });
    }

});

export default router;