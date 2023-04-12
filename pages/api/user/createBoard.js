import db from "@/lib/db/mongoDB";
import User from "@/lib/model/user";

async function handler(req, res) {
	if (req.method !== "POST") {
		return;
	}

	const data = req.body;
	const { username, title } = data;

	const query = { username: username };
	const createNewBoard = {
		$push: {
			userBoards: {
				title: title,
				board: [],
			},
		},
	};

	try {
		const response = await User.updateOne(query, createNewBoard);
		res.status(201).json({ message: "New Board created", response: response });
	} catch (err) {
		console.log(err);
		res.status(422).json({ message: "Failed to create new Board" });
	}
}

export default handler;
