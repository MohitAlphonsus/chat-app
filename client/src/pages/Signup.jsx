import { useState } from "react";
import { Link } from "react-router";
import { AuthImagePattern, Logo } from "../components";
import { User, Mail, Lock, Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

export default function Signup() {
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const { isSigningUp } = useAuthStore();

	function handleChange(e) {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	}

	return (
		<div className="min-h-screen grid lg:grid-cols-2">
			<div className="flex flex-col justify-center items-center p-6 sm:p-12">
				<div className="w-full max-w-md space-y-8">
					<div className="text-center mb-8">
						<div className="flex flex-col items-center gap-2 group">
							<Logo />
						</div>
						<h2 className="text-2xl font-bold mt-4">Create Account</h2>
						<p className="text-base-content/60 mt-1">
							Get started with your free account
						</p>
					</div>
					<form className="space-y-6">
						<div className="form-control">
							<label className="label">
								<span className="label-text font-medium mb-2">Full Name</span>
							</label>

							<label className="input input-bordered flex items-center gap-2 w-full">
								<User className="w-5 h-5 text-base-content/40" />
								<input
									type="text"
									className="grow"
									placeholder="William Dafoe"
									name="fullName"
									value={formData.fullName}
									onChange={handleChange}
								/>
							</label>
						</div>
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
							disabled={isSigningUp}
						>
							{isSigningUp ? (
								<>
									<LoaderCircle className="size-5 animate-spin" />
									Loading...
								</>
							) : (
								"Sign Up"
							)}
						</button>
					</form>

					<div className="text-center">
						<p className="text-base-content/60">
							Already have an account?{" "}
							<Link to="/login" className="link link-hover link-primary">
								Sign In
							</Link>
						</p>
					</div>
				</div>
			</div>

			<AuthImagePattern
				title="Join our community	"
				subtitle="Connect with friends, share moments, create memories and stay in touch with your loved ones."
			/>
		</div>
	);
}
