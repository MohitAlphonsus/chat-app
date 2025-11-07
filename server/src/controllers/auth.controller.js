import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";

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

async function login(req, res) {}
async function logout(req, res) {}

export { signup, login, logout };
