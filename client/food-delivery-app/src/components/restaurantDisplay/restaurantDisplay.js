import React, { useState, useEffect } from "react";
import { Transition } from "semantic-ui-react";
import ReactPaginate from "react-paginate";
import Restaurant from "../restaurant";

import "./restaurantDisplay.css";

const RestaurantDisplay = ({ restaurantData, isLoading }) => {
	const [currentPage, setCurrentPage] = useState(0);
	const [data, setData] = useState(restaurantData);

	const itemsPerPage = 51;

	const pageOffset = currentPage * itemsPerPage;

	const currentPageData = data.slice(pageOffset, pageOffset + itemsPerPage);

	const pageCount = Math.ceil(data.length / itemsPerPage);
	useEffect(() => {
		setData(restaurantData);
	}, [restaurantData]);
	function handlePageClick({ selected: selectedPage }) {
		setCurrentPage(selectedPage);
	}
	return (
		<div>
			<div className="restaurants-container-page">
				<Transition.Group>
					{currentPageData.map((res) => (
						<Restaurant
							resName={res.name}
							setMeals={[
								res.setOne,
								res.setTwo,
								res.setThree,
								res.setFour,
								res.setFive,
							]}
							offDays={res.offDays}
							operationHours={res.operationHours}
						/>
					))}
				</Transition.Group>
			</div>
			<ReactPaginate
				previousLabel={"← Previous"}
				nextLabel={"Next →"}
				pageCount={pageCount}
				onPageChange={handlePageClick}
				containerClassName={"pagination"}
				previousLinkClassName={"pagination__link"}
				nextLinkClassName={"pagination__link"}
				disabledClassName={"pagination__link--disabled"}
				activeClassName={"pagination__link--active"}
			/>
		</div>
	);
};

export default RestaurantDisplay;
