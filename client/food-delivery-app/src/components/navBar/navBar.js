import React, { useState, useContext } from "react";
import { Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth";

import "./navBar.css";

const NavBar = () => {
	const { user, logout } = useContext(AuthContext);
	const [currentDir, setCurrentDir] = useState("Login");

	const handleItemClick = (e) => {
		setCurrentDir(e.target.name);
	};
	if (user) {
		return (
			<div className="navbar-container">
				<div className="navbar-container-leftlinks">
					<NavLink
						to="/home"
						className="navbar-link"
						activeClassName="navbar-link-active"
					>
						Restaurants
					</NavLink>
				</div>
				<div className="navbar-container-rightlinks">
					<NavLink
						to="/orders"
						id="Past Orders"
						className="navbar-link"
						activeClassName="nav-active"
						activeClassName="navbar-link-active"
					>
						Past Orders
					</NavLink>
					<NavLink
						to="/register"
						className="navbar-link"
						activeClassName="navbar-link-active"
						onClick={logout}
					>
						Logout
					</NavLink>
				</div>
			</div>
		);
	}
	return (
		<Menu pointing secondary>
			<Menu.Menu position="right">
				<NavLink to="/login" onClick={handleItemClick}>
					<Menu.Item
						name="Login"
						onClick={handleItemClick}
					/>
				</NavLink>
				<NavLink to="/register">
					<Menu.Item
						name="Register"
						onClick={handleItemClick}
					/>
				</NavLink>
			</Menu.Menu>
		</Menu>
	);
};

export default NavBar;
