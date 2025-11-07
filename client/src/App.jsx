import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Home, Signup, Login, Profile, Settings } from "./pages";
import { Navbar } from "./components";
import { Loader } from "lucide-react";

import { useAuthStore } from "./store/useAuthStore";
export default function App() {
	const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

	useEffect(
		function () {
			checkAuth();
		},
		[checkAuth]
	);

	console.log(authUser);

	if (isCheckingAuth && !authUser)
		return (
			<div className="h-screen flex items-center justify-center">
				<Loader className="size-10 animate-spin" />
			</div>
		);

	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route
						path="/"
						element={authUser ? <Home /> : <Navigate to="/login" />}
					/>
					<Route
						path="/signup"
						element={!authUser ? <Signup /> : <Navigate to="/" />}
					/>
					<Route
						path="/login"
						element={!authUser ? <Login /> : <Navigate to="/" />}
					/>
					<Route
						path="/profile"
						element={authUser ? <Profile /> : <Navigate to="/login" />}
					/>
					<Route path="/settings" element={<Settings />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}
