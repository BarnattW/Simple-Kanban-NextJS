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
	const { boardID, id } = data;

	const query = { "userBoards._id": boardID, _id: id };
	const removeBoard = {
		$pull: {
			userBoards: { _id: boardID },
		},
	};

	try {
		const response = await User.updateOne(query, removeBoard);
		res.status(201).json({ message: "Board deleted", response: response });
	} catch (err) {
		console.log(err);
		res.status(422).json({ message: "Failed to delete Board" });
	}
}

export default handler;
