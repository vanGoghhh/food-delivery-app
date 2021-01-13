import React, { useState, useContext, useEffect } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition } from "semantic-ui-react";
import { AuthContext } from "../../context/auth";

import Order from "../../components/order";

import "./ordersPage.css";

const OrdersPage = () => {
	const { user } = useContext(AuthContext);

	const FETCH_ORDERS_QUERY = gql`
		query($username: String!) {
			getOrders(username: $username) {
				name
				setMeals
			}
		}
	`;

	const [orderData, setOrderData] = useState([]);

	const { loading, data } = useQuery(FETCH_ORDERS_QUERY, {
		variables: { username: user.username },
	});

	useEffect(() => {
		if (data) {
			setOrderData(data.getOrders);
		}
	}, [data]);

	return (
		<div className="orders-display">
		<h1>Past Orders</h1>
			{orderData.map((order) => (
				<Order resName={order.name} setMeals={order.setMeals} />
			))}
		</div>
	);
};

export default OrdersPage;
