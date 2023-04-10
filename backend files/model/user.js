const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

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

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("Board", userSchema);

module.exports = User;
