import express from 'express'; 
import "dotenv/config";
import cors from "cors";
import fetch from 'node-fetch';

const port = 8080;
const app = express();

app.use(express.json());
app.use(cors());

app.listen(port, () => {
    console.log(`App is Listening at port : ${port}`);
});

app.post("/test", async (req, res) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API}`,
        },
        body: JSON.stringify({
            model: "gpt-4o-mini", 
            messages: [{
                role: "user",
                content: req.body.message,
            }]
        })
    };

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", options);
        const data = await response.json();
        //console.log(data.choices[0].message.content); //reply
        res.send(data.choices[0].message.content);
    } catch (err) {
        console.error("Error:", err); 
        res.status(500).json({ error: "Something went wrong." });
    }
});
