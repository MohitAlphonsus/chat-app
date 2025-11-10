import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosClient } from "../lib/axiosClient";
import { useAuthStore } from "./useAuthStore";

const useChatStore = create((set, get) => ({
	messages: [],
	users: [],
	selectedUser: null,
	isUsersLoading: false,
	isMessagesLoading: false,

	getUsers: async () => {
		set({ isUsersLoading: true });
		try {
			const response = await axiosClient.get("/messages/users");
			set({ users: response.data });
		} catch (err) {
			toast.error(err.response.data.message);
		} finally {
			set({ isUsersLoading: false });
		}
	},

	getMessages: async (userId) => {
		set({ isMessagesLoading: true });
		try {
			const response = await axiosClient.get(`/messages/${userId}`);
			set({ messages: response.data });
		} catch (err) {
			toast.error(err.response.data.message);
		} finally {
			set({ isMessagesLoading: false });
		}
	},

	sendMessage: async (messageData) => {
		const { selectedUser, messages } = get();
		try {
			const response = await axiosClient.post(
				`/messages/send/${selectedUser._id}`,
				messageData
			);
			set({ messages: [...messages, response.data] });
		} catch (err) {
			toast.error(err.response.data.message);
		}
	},

	subscribeToMessages: () => {
		const { selectedUser } = get();
		if (!selectedUser) return;

		const socket = useAuthStore.getState().socket;

		socket.on("newMessage", (newMessage) => {
			const isMessageSentFromSelectedUser =
				newMessage.senderId === selectedUser._id;
			if (!isMessageSentFromSelectedUser) return;

			set({
				messages: [...get().messages, newMessage],
			});
		});
	},

	unsubscribeToMessages: () => {
		const socket = useAuthStore.getState().socket;
		socket.off("newMessage");
	},

	setSelectedUser: (selectedUser) => {
		set({ selectedUser });
	},
}));

export { useChatStore };
