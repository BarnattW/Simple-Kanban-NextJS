import db from "@/lib/db/mongoDB";
import User from "@/lib/model/user";
import { hashPassword } from "@/lib/auth";

async function handler(req, res) {
	if (req.method !== "POST") {
		return;
	}
	const data = req.body;

	const { username, password } = data;

	if (
		!username ||
		!username.includes("@") ||
		!password ||
		!password.trim().length > 8
	) {
		res.status(422).json({ message: "Invalid input--Try Again" });
		return;
	}

	const hashedPassword = await hashPassword(password);
	try {
		const response = await User.create({
			username: username,
			password: hashedPassword,
			userBoards: [],
		});
		res.status(201).json({ success: true });
	} catch (err) {
		console.log(err);
		res.json({ success: false });
	}
}

export default handler;
