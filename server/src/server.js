import express from "express";
import connectDatabse from "./lib/db.js";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

// Server
async function createServer() {
	await connectDatabse();
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
}

createServer();
