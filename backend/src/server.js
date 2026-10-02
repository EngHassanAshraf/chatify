import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.route.js";
import profileRoutes from "./routes/profile.route.js";
import messageRoutes from "./routes/message.route.js";
import path from "path";
import cookieParser  from "cookie-parser";

import { connectDB } from "./lib/db.js";
import env from "./lib/env.js";

const app = express();
const __dirname = path.resolve();
const PORT = env.port || 3000;

app.use(cookieParser());
app.use(morgan("dev"));
// app.use(morgan("combined"));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/messages", messageRoutes);

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