import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Home, Signup, Login, Profile, Settings } from "./pages";
import { Navbar } from "./components";

import { useAuthStore } from "./store/useAuthStore";
export default function App() {
	const { authUser, checkAuth } = useAuthStore();

	useEffect(
		function () {
			checkAuth();
		},
		[checkAuth]
	);

	console.log(authUser);

	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/login" element={<Login />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/settings" element={<Settings />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}
