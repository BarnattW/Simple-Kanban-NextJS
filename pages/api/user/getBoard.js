import db from "@/lib/db/mongoDB";
import User from "@/lib/model/user";

async function handler(req, res) {
	if (req.method !== "POST") {
		return;
	}

	const data = req.body;
	const { boardID, username } = data;
	const query = { "userBoards._id": boardID, username: username };

	try {
		const response = await User.findOne(query, {
			userBoards: { $elemMatch: { _id: boardID } },
		});

		res
			.status(201)
			.json({ message: "Board retreived", userBoards: response.userBoards });
	} catch (err) {
		console.log(err);
		res.status(422).json({ message: "Failed to retreive board" });
	}
}

export default handler;
