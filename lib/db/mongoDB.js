//MongoDB setup
import mongoose from "mongoose";

const dbURI = process.env.ATLAS_URI;
mongoose.connect(
	//create new env file to store credentials
	dbURI,
	{
		useNewUrlParser: true,
	}
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
	console.log("Connected successfully");
});

module.exports = db;
