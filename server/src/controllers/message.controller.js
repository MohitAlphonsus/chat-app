import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

async function getUsersToDisplay(req, res) {
	try {
		const loggedInUserId = req.user._id;
		const filteredUsers = await User.find({
			_id: { $ne: loggedInUserId },
		}).select("-password");
		res.status(200).json(filteredUsers);
	} catch (err) {
		console.log(`Error in getUsersToDisplay ${err.message}`);
		res.status(500).json({ message: "Internal Server Error" });
	}
}

async function getMessages(req, res) {
	try {
		const { id: userToChatId } = req.params;
		const myId = req.user._id;

		const messages = await Message.find({
			$or: [
				{ senderId: myId, receiverId: userToChatId },
				{ senderId: userToChatId, receiverId: myId },
			],
		});
		res.status(200).json(messages);
	} catch (err) {
		res.status(500).json({ message: "Internal Server Error" });
	}
}

async function sendMessage(req, res) {
	try {
		const { text, image } = req.body;
		const { id: receiverId } = req.params;
		const myId = req.user._id;

		let imgUrl;
		if (image) {
			const uploadResult = await cloudinary.uploader.upload(image);
			imgUrl = uploadResult.secure_url;
		}

		const newMessage = new Message({
			senderId: myId,
			receiverId,
			text,
			image: imgUrl,
		});

		await newMessage.save();

		const messageData = newMessage.toObject();

		// socket.io for real time communication
		const recieverSocketId = getReceiverSocketId(receiverId);
		const senderSocketId = getReceiverSocketId(myId);
		if (recieverSocketId) {
			io.to(recieverSocketId).emit("newMessage", messageData);
		}

		if (senderSocketId) {
			io.to(senderSocketId).emit("newMessage", messageData);
		}

		res.status(201).json(messageData);
	} catch (err) {
		res.status(500).json({ message: "Internal Server Error" });
	}
}

export { getUsersToDisplay, getMessages, sendMessage };
