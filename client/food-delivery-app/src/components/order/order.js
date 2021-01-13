import React from "react";

import { Card, Label } from "semantic-ui-react";

import "./order.css";

const Order = ({ resName, setMeals }) => {
	return (
		<div className="order-card">
			<h1>{resName}</h1>
			<h4>Set Meals</h4>
			<div style={{ padding: 10 }}>
				{setMeals.map((setMeal) => {
					return <li style={{ padding: "10px" }}>{setMeal}</li>;
				})}
			</div>
		</div>
	);
};

export default Order;
