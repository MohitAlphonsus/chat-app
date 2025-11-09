import dotenv from "dotenv";
import express from "express";
import connectDatabse from "./lib/db.js";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
import cors from "cors";
dotenv.config();

import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

// Server
async function createServer() {
	await connectDatabse();
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
}

createServer();
