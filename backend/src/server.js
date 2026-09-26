import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import path from "path";
import { connectDB } from "./lib/db.js";
import { env } from "./lib/env.js";

const app = express();
const __dirname = path.resolve();
const PORT = env.port || 3000;

app.use(express.json()); // get access to req.body in user requests

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// make ready for production
if (env.nodeENV == "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("*", (_, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}


app.listen(PORT, () => {
    console.log("Server is running on port " + PORT)
    connectDB();
});