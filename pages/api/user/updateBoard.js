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
	const { boardID, id, editedBoard } = data;

	const query = { "userBoards._id": boardID, _id: id };
	const updatedBoard = {
		$set: {
			"userBoards.$.title": editedBoard.title,
			"userBoards.$.board": editedBoard.board,
		},
	};

	try {
		const response = await User.updateOne(query, updatedBoard);
		res.status(201).json({ message: "Board updated", response: response });
	} catch (err) {
		console.log(err);
		res.status(422).json({ message: "Failed to update board" });
	}
}

export default handler;
