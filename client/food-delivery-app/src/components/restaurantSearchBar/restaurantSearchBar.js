import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { Button, Form } from "semantic-ui-react";

import "./restaurantSearchBar.css";

const RestaurantSearchBar = ({ updateTime, updateResSearchName }) => {
	const [time, setTime] = useState(new Date());
	const [resSearchName, setResSearchName] = useState("");

	const handleNameSearchSubmit = (e) => {
		e.preventDefault();
		if (resSearchName === "") {
			alert("Empty Restaurant Name field!");
		} else {
			updateResSearchName(resSearchName);
		}
	};
	return (
		<div className="restaurant-searchbar-container">
			<div className="restaurant-searchbar-time-search">
				<h4 style={{ fontFamily: "Poppins" }}>Search By Opening Time</h4>
				<DateTimePicker
					onChange={(value) => {
						setTime(value);
						updateTime(value);
					}}
					value={time}
				></DateTimePicker>
			</div>
			<div className="restaurant-searchbar-name-search">
				<h4 style={{ fontFamily: "Poppins" }}>Search By Restaurant Name</h4>
				<Form
					onSubmit={handleNameSearchSubmit}
					className="restaurant-searchbar-searchcontent"
				>
					<Form.Input
						placeholder="Enter restaurant name"
						type="text"
						onChange={(e) => setResSearchName(e.target.value)}
						style={{ width: "50%" }}
					/>
					<Button
						type="submit"
						color="teal"
						style={{ display: "inline-block", padding: "10px 40px 10px 40px" }}
					>
						Search
					</Button>
				</Form>
			</div>
		</div>
	);
};

export default RestaurantSearchBar;
