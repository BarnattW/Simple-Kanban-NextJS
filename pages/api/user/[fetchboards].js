import db from "@/lib/db/mongoDB";
import User from "@/lib/model/user";
import { getToken } from "next-auth/jwt";

export async function getUserBoards(req, res, id) {
	const user = await User.findOne({ _id: id });
	return {
		userBoards: user.userBoards,
	};
}

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
	const { id } = data;
	if (!id || id == "undefined") {
		res.status(422).json({ message: "Unauthorized" });
		return;
	}

	const user = await User.findOne({ _id: id });

	res.status(201).json({
		userBoards: user.userBoards,
	});
}

export default handler;
