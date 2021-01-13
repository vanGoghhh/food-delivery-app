import React from "react";
import { Modal } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./confirmOrderPopup.css";

const ConfirmOrderPopup = ({resName, setMeals, isShown, onHide }) => {
	return (
		<Modal
			size="lg"
			aria-labelledby="container-modal-title-vcenter"
			show={isShown}
			onHide={onHide}
			contentClassName="restaurant-confirm-order-popup"
		>
			<Modal.Header closeButton></Modal.Header>
			<h1 className="restaurant-confirm-order-popup-message"> Order Confirmed </h1>
			<div className="restaurant-confirm-order-info">
				<h1 className="restaurant-confirm-order-header">{resName}</h1>
				{setMeals.map((setMeal) => {
					return <div>{setMeal}</div>;
				})}
            </div>
		</Modal>
	);
};


export default ConfirmOrderPopup;