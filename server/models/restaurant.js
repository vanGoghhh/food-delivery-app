const { model, Schema } = require('mongoose');

const restaurantSchema = new Schema({
	name: String,
	operationHours: String,
	offDays: String,
	setOne: String,
	setTwo: String,
	setThree: String,
	setFour: String,
	setFive: String,
});

module.exports = model("Restaurant", restaurantSchema);
