import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { AuthContext } from "../../context/auth";

const RegisterPage = ({ props }) => {
	const REGISTER_USER = gql`
		mutation register($username: String!, $password: String!) {
			register(registerUser: { username: $username, password: $password }) {
				id
				username
				token
				orders {
					name
					setMeals
				}
				createdAt
			}
		}
	`;

	const context = useContext(AuthContext);

	const history = useHistory();

	const [errors, setErrors] = useState({});

	const [userValue, setUserValue] = useState({
		username: "",
		password: "",
		orders: [],
	});

	const [addUser, { loading }] = useMutation(REGISTER_USER, {
		update(_, result) {
			context.login(result.data.register);
			history.push("/");
			console.log(result);
		},
		onError(err) {
			console.log("??ERR");
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
		variables: userValue,
	});

	const onChange = (e) => {
		setUserValue({ ...userValue, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addUser();
	};

	return (
		<div>
			<h1> Register </h1>
			<Form onSubmit={handleSubmit}>
				<Form.Input
					label="Username"
					placeholder="Username"
					name="username"
					value={userValue.username}
					onChange={onChange}
					error={errors.username ? true : false}
				/>
				<Form.Input
					label="Password"
					placeholder="Password"
					name="password"
					value={userValue.password}
					onChange={onChange}
					error={errors.password ? true : false}
				/>
				<Button type="submit" primary>
					Submit
				</Button>
			</Form>
			{Object.keys(errors).length > 0 && (
				<div className="ui error message">
					<ul className="list">
						{Object.values(errors).map((value) => (
							<li key={value}>{value}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default RegisterPage;
