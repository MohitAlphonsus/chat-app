// socket.js
import { Server } from "socket.io";
import http from "http";

let io;
let server;

// Store online users
const userSocketMap = {};

function getReceiverSocketId(userId) {
	return userSocketMap[userId];
}

function initSocket(app) {
	// Create HTTP server with the SAME Express app (important!)
	server = http.createServer(app);

	io = new Server(server, {
		cors: {
			origin: ["http://localhost:5173"],
		},
	});

	io.on("connection", (socket) => {
		console.log(`User Connected: ${socket.id}`);

		const userId = socket.handshake.auth.userId;
		if (userId) {
			userSocketMap[userId] = socket.id;
		}

		// Notify all clients about online users
		io.emit("getOnlineUsers", Object.keys(userSocketMap));

		socket.on("disconnect", () => {
			console.log("User Disconnected", socket.id);
			delete userSocketMap[userId];
			io.emit("getOnlineUsers", Object.keys(userSocketMap));
		});
	});
}

export { initSocket, io, server, getReceiverSocketId };
