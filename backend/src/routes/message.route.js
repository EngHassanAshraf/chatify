import express from "express";

const router = express.Router();

router.get("/send", (req, res) => { res.send("<h1>Hello Everyone</h1>")})

export default router;