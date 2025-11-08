import { create } from "zustand";

const useThemeStore = create((set) => ({
	chatTheme: localStorage.getItem("chat-theme") || "light",
	setChatTheme: (theme) => {
		set({ chatTheme: theme });
		localStorage.setItem("chat-theme", theme);
	},
}));

export { useThemeStore };
