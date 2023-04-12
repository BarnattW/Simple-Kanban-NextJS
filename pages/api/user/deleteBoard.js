import db from "@/lib/db/mongoDB";
import User from "@/lib/model/user";

async function handler(req, res) {
	if (req.method !== "POST") {
		return;
	}

	const data = req.body;
	const { boardID, username } = data;

	const query = { "userBoards._id": boardID, username: username };
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
