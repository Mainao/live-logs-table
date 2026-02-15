require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || "*";

app.use(
    cors({
        origin: FRONTEND_URL,
    }),
);

app.get("/", (req, res) => {
    res.send("SSE Logs Backend Running");
});

app.get("/logs", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    const heartbeat = setInterval(() => {
        res.write(": heartbeat\n\n");
    }, 15000);

    const interval = setInterval(() => {
        const log = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            level: ["INFO", "WARN", "ERROR"][Math.floor(Math.random() * 3)],
            service: ["Auth", "Payments", "Orders"][
                Math.floor(Math.random() * 3)
            ],
            message: "Live SSE log event",
        };

        res.write(`data: ${JSON.stringify(log)}\n\n`);
    }, 1500);

    req.on("close", () => {
        console.log("Client disconnected");
        clearInterval(interval);
        clearInterval(heartbeat);
    });
});

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
