const { model, Schema } = require("mongoose");

const orderSchema = new Schema({
	name: String,
	setMeals: [String],
	user: {
		type: Schema.Types.ObjectId,
		ref: "users",
	},
});

module.exports = model("Order", orderSchema);
