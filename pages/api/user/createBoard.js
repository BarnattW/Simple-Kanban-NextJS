import db from "@/lib/db/mongoDB";
import User from "@/lib/model/user";
import { getToken } from "next-auth/jwt";

async function handler(req, res) {
	if (req.method !== "POST") {
		return;
	}

	const token = await getToken({ req });
	if (!token) {
		res.status(401).json({ message: "Unauthorized" });
		return;
	}

	const data = req.body;
	const { id, title } = data;

	const query = { _id: id };
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
