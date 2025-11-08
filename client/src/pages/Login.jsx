import { useState } from "react";
import { Link } from "react-router";
import { AuthImagePattern, Logo } from "../components";
import { Mail, Lock, Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { toast } from "react-hot-toast";

export default function Login() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const { isLoggingIn, login } = useAuthStore();

	function handleChange(e) {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	}

	function handleValidation() {
		if (!formData.email.trim()) return toast.error("Email is required");
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
			return toast.error("Invalid email format");
		if (!formData.password.trim()) return toast.error("Password is required");
		if (formData.password.length < 6)
			return toast.error("Password must be at least 6 characters");

		return true;
	}

	function handleSubmit(e) {
		e.preventDefault();

		const success = handleValidation();
		if (success === true) {
			login(formData);
		}
	}

	return (
		<div className="min-h-screen grid lg:grid-cols-2">
			<div className="flex flex-col justify-center items-center p-6 sm:p-12">
				<div className="w-full max-w-md space-y-8">
					<div className="text-center mb-8">
						<div className="flex flex-col items-center gap-2 group">
							<Logo />
						</div>
						<h2 className="text-2xl font-bold mt-4">Welcome back</h2>
						<p className="text-base-content/60 mt-1">
							Log in to continue the conversation.
						</p>
					</div>
					<form className="space-y-6" onSubmit={handleSubmit}>
						<div className="form-control">
							<label className="label">
								<span className="label-text font-medium mb-2">Email</span>
							</label>

							<label className="input input-bordered flex items-center gap-2 w-full">
								<Mail className="size-5 text-base-content/40" />
								<input
									type="text"
									className="grow"
									placeholder="willdoe@email.com"
									name="email"
									value={formData.email}
									onChange={handleChange}
								/>
							</label>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text font-medium mb-2">Password</span>
							</label>

							<label className="input input-bordered flex items-center gap-2 w-full">
								<Lock className="size-5 text-base-content/40" />
								<input
									type={showPassword ? "text" : "password"}
									className="grow"
									placeholder="*******"
									name="password"
									value={formData.password}
									onChange={handleChange}
								/>
								<button
									type="button"
									className="p-1 text-base-content/40 hover:text-base-content/70 cursor-pointer"
									onClick={() => setShowPassword(!showPassword)}
								>
									{showPassword ? (
										<EyeOff className="size-5" />
									) : (
										<Eye className="size-5" />
									)}
								</button>
							</label>
						</div>

						<button
							type="submit"
							className="btn btn-primary w-full"
							disabled={isLoggingIn}
						>
							{isLoggingIn ? (
								<>
									<LoaderCircle className="size-5 animate-spin" />
									Loading...
								</>
							) : (
								"Log In"
							)}
						</button>
					</form>

					<div className="text-center">
						<p className="text-base-content/60">
							Don't have an account?{" "}
							<Link to="/signup" className="link link-hover link-primary">
								Sign Up
							</Link>
						</p>
					</div>
				</div>
			</div>

			<AuthImagePattern
				title="Good to see you again!"
				subtitle="Dive right back into your conversations — stay connected and continue making memories with the people who matter most."
			/>
		</div>
	);
}
