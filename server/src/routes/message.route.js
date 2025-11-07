import express from "express";
import {
	getUsersToDisplay,
	getMessages,
	sendMessage,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const messageRouter = express.Router();

messageRouter.get("/users", protectRoute, getUsersToDisplay);
messageRouter.get("/:id", protectRoute, getMessages);
messageRouter.post("/send/:id", protectRoute, sendMessage);

export default messageRouter;
