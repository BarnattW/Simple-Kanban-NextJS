import User from "@/lib/model/user";
import db from "@/lib/db/mongoDB";
import { hashPassword } from "@/lib/auth";

async function handler(req, res) {
	if (req.method !== "POST") {
		return;
	}
	const data = req.body;

	const { username, password } = data;

	if (
		!email ||
		!email.includes("@") ||
		!password ||
		!password.trim().length < 8
	) {
		res.status(422).json({ message: "Invalid input--Try Again" });
		return;
	}

	const hashedPassword = hashPassword(password);

	const res = await User.register(
		{ username: username, password: hashedPassword, userBoards: [] },
		function (err, user) {
			if (err) {
				console.log(err);
				res.json({ success: false });
			} else {
				console.log("User created");
				res.json({ success: true });
				res.status(201).json({ message: "User Created" });
			}
		}
	);
}

export default handler;
