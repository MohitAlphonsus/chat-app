import { create } from "zustand";
import { axiosClient } from "../lib/axiosClient";

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
}));

export { useAuthStore };
