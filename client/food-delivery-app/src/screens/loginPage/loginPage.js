import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { AuthContext } from "../../context/auth";

import "./loginPage.css";

const LoginPage = () => {
	const LOGIN_USER = gql`
		mutation login($username: String!, $password: String!) {
			login(username: $username, password: $password) {
				id
				username
				token
			}
		}
	`;

	const history = useHistory();

	const context = useContext(AuthContext);

	const [errors, setErrors] = useState({});

	const [userValue, setUserValue] = useState({
		username: "",
		password: "",
	});

	const [loginUser, { loading }] = useMutation(LOGIN_USER, {
		update(_, result) {
			context.login(result.data.login);
			console.log(result.data.login);
			history.push("/home");
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
		variables: userValue,
	});

	const onChange = (e) => {
		setUserValue({ ...userValue, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		loginUser();
	};

	return (
		<div className="form-container">
			<Form
				onSubmit={handleSubmit}
				noValidate
				className={loading ? "loading" : ""}
			>
				<h1>Login</h1>
				<Form.Input
					label="Username"
					placeholder="Username.."
					name="username"
					type="text"
					value={userValue.username}
					error={errors.username ? true : false}
					onChange={onChange}
				/>
				<Form.Input
					label="Password"
					placeholder="Password.."
					name="password"
					type="password"
					value={userValue.password}
					error={errors.password ? true : false}
					onChange={onChange}
				/>
				<Button type="submit" primary>
					Login
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

export default LoginPage;
