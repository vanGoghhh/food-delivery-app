import React, { useState, useEffect } from "react";
import RestaurantSearchBar from "../../components/restaurantSearchBar";
import RestaurantDisplay from "../../components/restaurantDisplay";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import "./restaurantsMainPage.css";

const Restaurants = () => {
	const FETCH_RESTAURANTS_QUERY = gql`
		{
			getRestaurants {
				name
				operationHours
				offDays
				setOne
				setTwo
				setThree
				setFour
				setFive
			}
		}
	`;
	const [time, setTime] = useState(new Date());

	const [resSearchName, setResSearchName] = useState("");

	const [restaurantData, setRestaurantData] = useState([]);

	const [displayedRestaurants, setDisplayedRestaurants] = useState([]);

	const { loading, data } = useQuery(FETCH_RESTAURANTS_QUERY);

	useEffect(() => {
		if (data) {
			setRestaurantData(data.getRestaurants);
			setDisplayedRestaurants(data.getRestaurants);
		}
	}, [data]);

	// gets day of week in string from data
	const getDayOfWeek = (date) => {
		const dayOfWeek = new Date(date).getDay();
		return isNaN(dayOfWeek)
			? null
			: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][dayOfWeek];
	};

	// convert time given in csv file to a format that is usable in this program
	const convertTimeRange = (timeRange) => {
		if ((timeRange.match(/am/g) || []).length === 2) {
			return timeRange
				.replaceAll("am", "")
				.replace(/\s+/g, "")
				.split("-")
				.map((time) => parseInt(time));
		} else if ((timeRange.match(/pm/g) || []).length === 2) {
			return timeRange
				.replaceAll("pm", "")
				.replace(/\s+/g, "")
				.split("-")
				.map((time) => parseInt(time, 12));
		} else {
			const editedTime = timeRange.replace(/\s+/g, "").split("-");
			const start = editedTime[0].indexOf("am");
			const end = editedTime[1].indexOf("pm");
			editedTime[0] = parseInt(editedTime[0].substring(0, start));
			editedTime[1] = parseInt(editedTime[1].substring(0, end)) + 12;
			return editedTime;
		}
	};

	const handleTimeChange = (time) => {
		setTime(time);
		const dayOfWeek = getDayOfWeek(time);
		const timeInDay = time.getHours();
		if (data) {
			const filteredRestaurants = restaurantData
				.filter((res) => !res.offDays.includes(dayOfWeek))
				.filter((res) => {
					const timeRangeArr = convertTimeRange(res.operationHours);
					if (timeRangeArr[0] === timeRangeArr[1]) {
						return true;
					} else if (timeRangeArr[1] < timeRangeArr[0]) {
						return timeInDay >= timeRangeArr[0] || timeInDay <= timeRangeArr[1];
					} else {
						return timeInDay >= timeRangeArr[0] && timeInDay <= timeRangeArr[1];
					}
				});

			if (filteredRestaurants.length === 0) {
				alert("No restaurants found!");
			}
			setDisplayedRestaurants(filteredRestaurants);
		}
	};

	const handleResNameChange = (name) => {
		setResSearchName(name);
		const filteredRestaurants = restaurantData.filter((res) => {
			const resName = res.name.toLowerCase();
			return resName.includes(name.trim().toLowerCase());
		});
		if (filteredRestaurants.length === 0) {
			alert("No restaurants found!");
		} else {
			setDisplayedRestaurants(filteredRestaurants);
		}
	};
	return (
		<div className="restaurants-container">
			<RestaurantSearchBar
				updateTime={handleTimeChange}
				updateResSearchName={handleResNameChange}
			></RestaurantSearchBar>
			<RestaurantDisplay
				restaurantData={displayedRestaurants}
			></RestaurantDisplay>
		</div>
	);
};

export default Restaurants;
