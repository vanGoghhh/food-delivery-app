import React, { useState } from "react";

import OrderPopup from "../orderPopup";
import ConfirmOrderPopup from "../confirmOrderPopup";
import "./restaurant.css";

const Restaurant = ({ resName, setMeals, offDays, operationHours }) => {
	const [isOrderPopupOpen, setOrderPopupOpen] = useState(false);
	const [isConfirmOrderPopupOpen, setConfirmOrderPopupOpen] = useState(false);
	const [setMealsOrdered, setSetMealsOrdered] = useState([]);

	const showOrderForm = () => {
		setOrderPopupOpen(true);
	};

	const showConfirm = () => {
		setOrderPopupOpen(false);
		setConfirmOrderPopupOpen(true);
	};

	const setOrderInfo = (setMeals) => {
		setSetMealsOrdered(setMeals);
	};
	
	return (
		<div className="restaurant-card">
			<button onClick={showOrderForm} className="restaurant-info">
				<div className="restaurant-body">
					<div className="restaurant-header">
						<h1 className="restaurant-header-name">{resName}</h1>
					</div>
					<div className="restaurant-operation">
						<div> Off Days: {offDays}</div>
						<div> Operation Hours: {operationHours}</div>
					</div>
				</div>
			</button>
			<OrderPopup
				isShown={isOrderPopupOpen}
				onHide={() => setOrderPopupOpen(false)}
				setOrderInfo={setOrderInfo}
				resName={resName}
				setMeals={setMeals}
				showConfirmPopup={showConfirm}
			/>
			<ConfirmOrderPopup
				isShown={isConfirmOrderPopupOpen}
				onHide={() => setConfirmOrderPopupOpen(false)}
				resName={resName}
				setMeals={setMealsOrdered}
			/>
		</div>
	);
};

export default Restaurant;
