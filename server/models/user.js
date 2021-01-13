const { model, Schema } = require("mongoose");
const Order = require("./order").schema;

const userSchema = new Schema({
	username: String,
	password: String,
	createdAt: String,
	orders: [Order],
});

module.exports = model("User", userSchema);
