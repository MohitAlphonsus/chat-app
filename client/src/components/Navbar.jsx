import { Link } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

export default function Navbar() {
	const { authUser, logout } = useAuthStore();
	return (
		<header className="border-b border-base-300 w-full backdrop-blur-lg bg-base-100/80">
			<div className="container mx-auto px-4 h-16">
				<div className="flex items-center justify-between h-full">
					<div className="flex items-center gap-8">
						<Link
							to="/"
							className="flex items-center gap-2 hover:opacity-75 transition-all"
						>
							<div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
								<MessageSquare className="size-5 text-primary" />
							</div>
							<h1 className="text-lg font-bold">SayHi</h1>
						</Link>
					</div>

					<div className="flex items-center gap-2">
						<Link
							to="/settings"
							className={`btn btn-sm gap-2 transition-colors`}
						>
							<Settings className="size-4" />
							<span className="hidden sm:inline">Settings</span>
						</Link>
						{authUser && (
							<>
								<Link to="/profile" className="btn btn-sm gap-2">
									<User className="size-4" />
									<span className="hidden sm:inline">Profile</span>
								</Link>

								<button
									className="cursor-pointer ml-4 text-sm flex items-center gap-2"
									onClick={logout}
								>
									<LogOut className="size-4" />
									<span className="hidden sm:inline">Logout</span>
								</button>
							</>
						)}
					</div>
				</div>
			</div>
		</header>
	);
}
