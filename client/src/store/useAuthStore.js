import { create } from "zustand";
import { axiosClient } from "../lib/axiosClient";
import toast from "react-hot-toast";

const useAuthStore = create((set) => ({
	authUser: null,
	isSigningUp: false,
	isLoggingIn: false,
	isUpdatingProfile: false,

	isCheckingAuth: true,

	checkAuth: async () => {
		try {
			const response = await axiosClient.get("/auth/check");
			set({ authUser: response.data });
		} catch (err) {
			console.log(`Error in checkAuth ${err}`);
			set({ authUser: null });
		} finally {
			set({ isCheckingAuth: false });
		}
	},

	signup: async (formData) => {
		set({ isSigningUp: true });
		try {
			const response = await axiosClient.post("/auth/signup", formData);
			set({ authUser: response.data });
			toast.success("Signed up successfully!");
		} catch (err) {
			toast.error(err.response.data.message);
		} finally {
			set({ isSigningUp: false });
		}
	},

	login: async (formData) => {
		set({ isLoggingIn: true });
		try {
			const response = await axiosClient.post("/auth/login", formData);
			set({ authUser: response.data });
			toast.success("Login successful!");
		} catch (err) {
			toast.error(err.response.data.message);
		} finally {
			set({ isLoggingIn: false });
		}
	},

	logout: async () => {
		try {
			await axiosClient.post("/auth/logout");
			set({ authUser: null });
			toast.success("Logout successful!");
		} catch (err) {
			toast.error(err.response.data.message);
		}
	},

	updateProfile: async () => {},
}));

export { useAuthStore };
