import db from "@/lib/db/mongoDB";
import User from "@/lib/model/user";

async function handler(req, res) {
	if (req.method !== "POST") {
		return;
	}

	const data = req.body;
	const { username } = data;
	if (!username || username == "undefined") {
		res.status(422).json({ message: "Not authenticated" });
		return;
	}

	const user = await User.findOne({ username: username });

	res.status(201).json({
		_id: user._id,
		username: user.username,
		userBoards: user.userBoards,
	});
}

export default handler;
