const mongoose = require("mongoose");

//MongoDb schemas for user accounts
const boardsSchema = new mongoose.Schema({
	title: String,
	board: Array,
});
const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	userBoards: [boardsSchema],
});

const User = mongoose.models.Board || mongoose.model("Board", userSchema);

module.exports = User;
