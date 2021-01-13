const { ApolloServer, UserInputError } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Restaurant = require("./models/restaurant");
const User = require("./models/user");
const Order = require("./models/order");
const checkAuth = require("./util/checkAuth");

const {
	validateRegisterInput,
	validateLoginInput,
} = require("./util/validators");
const order = require("./models/order");
const { UniqueFieldDefinitionNamesRule } = require("graphql");

const typeDefs = gql`
	type Restaurant {
		id: ID!
		name: String!
		operationHours: String!
		offDays: String!
		setOne: String!
		setTwo: String!
		setThree: String!
		setFour: String!
		setFive: String!
	}
	type Order {
		id: ID!
		name: String!
		setMeals: [String]!
		username: String!
	}
	type User {
		id: ID!
		token: String!
		username: String!
		createdAt: String!
		orders: [Order]!
	}
	input RegisterUser {
		username: String!
		password: String!
	}
	input OrderInput {
		name: String!
		setMeals: [String]!
	}
	type Query {
		getRestaurants: [Restaurant]
		getOrders(username: String!): [Order]!
	}
	type Mutation {
		register(registerUser: RegisterUser): User!
		login(username: String!, password: String!): User!
		createOrder(name: String!, setMeals: [String]!): Order!
		updateUserOrder(orders: OrderInput, username: String!): User!
	}
`;

function generateToken(user) {
	return jwt.sign(
		{
			id: user.id,
			username: user.username,
		},
		"secret key",
		{ expiresIn: "1h" }
	);
}

const resolvers = {
	Query: {
		getRestaurants() {
			try {
				const restaurants = Restaurant.find();
				return restaurants;
			} catch (err) {
				throw new Error(err);
			}
		},
		async getOrders(_, {username}) {
			try {
				const user = await User.findOne({username: username})
				return user.orders
			} catch (err) {
				throw new Error(err);
			}
		},
	},
	Mutation: {
		async register(_, { registerUser: { username, password } }) {
			const { valid, errors } = validateRegisterInput(username, password);

			if (!valid) {
				throw new UserInputError("Errors", { errors });
			}

			const user = await User.findOne({ username });
			if (user) {
				throw new UserInputError("Username is taken", {
					errors: {
						username: "This username is taken",
					},
				});
			}
			const newUser = new User({
				username,
				password,
				orders: [],
				createdAt: new Date().toISOString(),
			});

			const res = await newUser.save();

			const token = generateToken(res);
			return {
				...res._doc,
				id: res._id,
				token,
			};
		},
		async login(_, { username, password }) {
			const { errors, valid } = validateLoginInput(username, password);

			if (!valid) {
				throw new UserInputError("Errors", { errors });
			}

			const user = await User.findOne({ username });

			if (!user) {
				errors.general = "User not found";
				throw new UserInputError("User not found", { errors });
			}

			const match = await bcrypt.compare(password, user.password);
			if (match) {
				errors.general = "Wrong password";
				throw new UserInputError("Wrong password", { errors });
			}

			const token = generateToken(user);

			return {
				...user._doc,
				id: user._id,
				token,
			};
		},
		async updateUserOrder(_, { orders: { name, setMeals }, username }) {
			const user = await User.findOne({ username: username });

			if (!user) {
				throw new Error("Cannot find user");
			}

			const newOrder = new Order({
				name,
				setMeals,
				user: user.id,
				username: user.username,
				createdAt: new Date().toISOString,
			});

			user.orders = user.orders.concat(newOrder);

			await user.save();

			console.log(user.orders);

			return user;
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({ req }),
});
mongoose
	.connect(
		"mongodb+srv://nigelng:nigelng24@cluster0.sli2s.mongodb.net/foodData?retryWrites=true&w=majority",
		{ useNewUrlParser: true, useUnifiedTopology: true }
	)
	.then(() => {
		console.log("Connected to mongoDB");
		return server.listen({ port: 5000 });
	})
	.then((res) => {
		console.log("server running");
	});
