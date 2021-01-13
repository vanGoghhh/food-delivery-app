const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");


function generateToken(user) {
	return jwt.sign(
		{
			id: user.id, 
			email: user.email,
			username: user.username,
		},
		"secret key",
		{ expiresIn: "1h" }
	);
}

module.exports = {
	Mutation: {
		async register(_, { registerUser: { username, password } }) {
			const newUser = new User({
				username,
				password,
				createdAt: new Date().toISOString(),
            });
            const res = await newUser.save();
            const token = generateToken(res);
            return {
                ...res._doc,
                id: res._id,
                token
              };
		},
	},
};
