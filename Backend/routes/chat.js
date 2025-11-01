import express from 'express';
import Thread from '../models/Thread.js';
import geminiResponse, {clearChatHistory} from '../utils/gemini.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();


router.use(authenticate);

// Get all chat threads FOR CURRENT USER ONLY
router.get('/threads', async (req, res) => {
    try {
        const threads = await Thread.find({ user: req.user._id }).sort({ updatedAt: -1 });
        res.json(threads);
    } catch (error) {
        console.error("Error fetching threads:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get chat messages for a specific thread - ONLY IF USER OWNS IT
router.get('/threads/:threadId', async (req, res) => {
    const { threadId } = req.params;
    try {
        const thread = await Thread.findOne({ threadId, user: req.user._id });
        if (!thread) {
            return res.status(404).json({ error: "Thread not found" });
        }
        res.json(thread.messages);
    } catch (error) {
        console.error("Error fetching thread:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Delete a chat thread - ONLY IF USER OWNS IT
router.delete('/threads/:threadId', async (req, res) => {
    const { threadId } = req.params;
    try {
        const thread = await Thread.findOneAndDelete({ threadId, user: req.user._id });
        if (!thread) {
            return res.status(404).json({ error: "Thread not found" });
        }
        res.json({ message: "Thread deleted successfully" });
    } catch (error) {
        console.error("Error deleting thread:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// New message to existing chat thread or a new chat thread - ALWAYS LINK TO USER
router.post('/chat', async (req, res) => {
    const { threadId, message, model = "gemini-2.0-flash" } = req.body;

    if (!threadId || !message) {
        return res.status(400).json({ error: "Fields are required" });
    }

    try {
        let thread = await Thread.findOne({ threadId, user: req.user._id });
        
        if (!thread) {
            // Create new thread WITH USER REFERENCE
            thread = new Thread({
                threadId,
                title: message.substring(0, 50) + (message.length > 50 ? "..." : ""),
                user: req.user._id, // ADD THIS
                messages: [{
                    role: "user",
                    content: message
                }]
            });

            clearChatHistory(threadId);
        } else {
            thread.messages.push({
                role: "user",
                content: message
            });
        }

        const geminiReply = await geminiResponse(message, threadId, model);
        // console.log("Gemini Reply:", geminiReply);

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