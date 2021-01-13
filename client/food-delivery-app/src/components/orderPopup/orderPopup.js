import React, { useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import { Button, Form } from "semantic-ui-react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../../context/auth";
import gql from "graphql-tag";

import "./orderPopup.css";
import "bootstrap/dist/css/bootstrap.min.css";

const OrderPopup = ({
	resName,
	setMeals,
	isShown,
	onHide,
	setOrderInfo,
	showConfirmPopup,
}) => {
	const { user } = useContext(AuthContext);

	const FETCH_ORDERS_QUERY = gql`
		query($username: String!) {
			getOrders(username: $username) {
				name
				setMeals
			}
		}
	`;

	const UPDATE_USER_ORDER = gql`
		mutation updateUserOrder(
			$name: String!
			$setMeals: [String]!
			$username: String!
		) {
			updateUserOrder(
				orders: { name: $name, setMeals: $setMeals }
				username: $username
			) {
				id
				orders {
					name
					setMeals
				}
			}
		}
	`;

	const [resOrder, setResOrder] = useState([]);

	const [updateUserOrder, { error }] = useMutation(UPDATE_USER_ORDER, {
		variables: { name: resName, setMeals: resOrder, username: user.username },
		update(_, result) {
			setResOrder([]);
		},
		refetchQueries: [{
			query: FETCH_ORDERS_QUERY,
			variables: {username: user.username}
		}]
	});

	const handleOrderSubmit = (e) => {
		if (resOrder.length === 0) {
			alert("No Set Meal Selected");
		} else {
			e.preventDefault();
			updateUserOrder();
			setOrderInfo(resOrder);
			showConfirmPopup();
		}
	};

	const addSetMeal = (e) => {
		const setMeal = e.target.name;
		if (!resOrder.includes(setMeal)) {
			setResOrder((resOrder) => [...resOrder, setMeal]);
		} else {
			setResOrder(resOrder.filter((currMeals) => currMeals != setMeal));
		}
	};

	return (
		<Modal
			size="lg"
			aria-labelledby="container-modal-title-vcenter"
			show={isShown}
			onHide={onHide}
			contentClassName="restaurant-order-popup"
		>
			<Modal.Header closeButton />
			<h1 className="restaurant-order-popup-header">{resName}</h1>
			<div className="restaurant-order-popup-form">
				<Form onSubmit={handleOrderSubmit}>
					<h1>Set Meals</h1>
					<div className="restaurant-order-popup-setmeals">
						{setMeals.map((setMeal) => {
							return (
								<div class="ui checkbox">
									<input type="checkbox" name={setMeal} onChange={addSetMeal} />
									<label>{setMeal}</label>
								</div>
							);
						})}
					</div>
					<div className="restaurant-order-popup-button-container">
						<Button type="submit" color="teal">
							Submit Order
						</Button>
					</div>
				</Form>
			</div>
		</Modal>
	);
};

export default OrderPopup;
