import express, { application } from "express"
import Thread from "../models/Thread.js";
import getOpenAIAPIResponse from "../utils/openai.js"
const router = express.Router();

//test
router.post("/test", async (req, res) => {
    try {
        const thread = new Thread({
            threadId: "xyz1",
            title: "Testing new Thread2",

        });

        const response = await thread.save();
        res.send(response)

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "failed to save in DB" })
    }
});

// get all threads

router.get("/thread", async (req, res) => {
    try {
        const threads = await Thread.find({}).sort({ updatedAt: -1 });
        // sort according to most recent activity - last updated
        res.json(threads)

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to Get threads" })
    }
});

router.get("/thread/:threadId", async (req, res) => {
    const { threadId } = req.params;
    try {
        const thread = await Thread.findOne({ threadId })
        if (!thread) {
            return res.status(404).json({ error: "Thread is not found!!" });
        }
        res.json(thread.messages);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to Fetch the Thread" })
    }
})
router.delete("/thread/:threadId", async (req, res) => {
    const { threadId } = req.params;
    try {
        const deletedThread = await Thread.findOneAndDelete({ threadId });
        if (!deletedThread) {
            return res.status(404).json({ error: "Failed to delete the thread!!" })
        }
        res.status(200).json({ success: "Thread deleted Successfully!!" })

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to Delete the thread" })
    }
});

router.post("/chat", async (req, res) => {
    const { threadId, message } = req.body;

    if (!threadId || !message) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const thread = await Thread.findOne({ threadId });
        if (!thread) {
            // create a new thread in db
            thread = new Thread({
                threadId,
                title: message,
                messages: [{ role: "user", content: message }],
            })
        } else {
            thread.messages.push({ role: "user", content: message })
        }

        const assistantReply = await getOpenAIAPIResponse(message);
        thread.messages.push({ role: "assistant", content: assistantReply });
        thread.updatedAt = new Date();
        await thread.save();
        res.json({ reply: assistantReply });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Some Error Occurred!!" });
    }
})

export default router;