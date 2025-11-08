import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

async function signup(req, res) {
	const { fullName, email, password } = req.body;
	try {
		if (!fullName || !email || !password) {
			return res.status(400).json({ message: "All fields are required" });
		}

		if (password.length < 6) {
			return res
				.status(400)
				.json({ message: "Password must be at least 6 characters" });
		}

		const user = await User.findOne({ email });

		if (user) {
			return res.status(400).json({ message: "User already exists" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			fullName,
			email,
			password: hashedPassword,
		});

		if (newUser) {
			generateToken(newUser._id, res);
			await newUser.save();

			return res
				.status(201)
				.json({ message: "User created successfully", user: newUser });
		} else {
			return res.status(500).json({ message: "Something went wrong" });
		}
	} catch (err) {}
}

async function login(req, res) {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (!isPasswordCorrect) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		generateToken(user._id, res);
		res.status(200).json({ message: "Login successful", user });
	} catch (err) {
		res.status(500).json({ message: "Internal Server Error" });
	}
}

function logout(req, res) {
	try {
		res.cookie("token", "", {
			maxAge: 0,
		});
		res.status(200).json({ message: "Logout successful" });
	} catch (err) {
		res.status(500).json({ message: "Internal Server Error" });
	}
}

async function updateProfile(req, res) {
	try {
		const { profilePicture } = req.body;
		const userId = req.user._id;
		if (!profilePicture) {
			return res.status(400).json({ message: "Profile picture is required" });
		}
		const uploadResult = await cloudinary.uploader.upload(profilePicture);
		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{
				profilePicture: uploadResult.secure_url,
			},
			{ new: true }
		);
		res
			.status(200)
			.json({ message: "Profile updated successfully", user: updatedUser });
	} catch (err) {
		console.error("Cloudinary upload error:", err);
		res.status(500).json({ message: err.message || "Internal Server Error" });
	}
}

function checkAuth(req, res) {
	try {
		res.status(200).json(req.user);
	} catch (err) {
		console.log(`Error in check auth controller ${err.message}`);
		res.status(500).json({ message: "Internal Server Error" });
	}
}

export { signup, login, logout, updateProfile, checkAuth };
