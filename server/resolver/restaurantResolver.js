const Restaurant = require("../models/restaurant");

module.exports = {
	Query: {
		getRestaurants() {
			try {
				const restaurants = Restaurant.find();
				return restaurants;
			} catch (err) {
				throw new Error(err);
			}
		},
	},
};
