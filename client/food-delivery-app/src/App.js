import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import { setContext } from "apollo-link-context";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";

import { AuthProvider } from "./context/auth";
import  AuthRoute  from "./util/authRoute"

import NavBar from "./components/navBar";
import Restaurants from "./screens/restaurantsMainPage";
import LoginPage from "./screens/loginPage";
import RegisterPage from "./screens/registerPage";
import OrdersPage from "./screens/ordersPage/ordersPage";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

const httpLink = createHttpLink({
	uri: "http://localhost:5000",
});

const authLink = setContext(() => {
	const token = localStorage.getItem("jwtToken");
	return {
		headers: {
			Authorization: token ? `Bearer ${token}` : "",
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<AuthProvider>
				<Router>
					<Container>
						<NavBar />
						<Switch>
							<Route path="/home" component={Restaurants} />
							<AuthRoute path="/login" component={LoginPage} />
							<AuthRoute path="/register" component={RegisterPage} />
							<Route path="/orders" component={OrdersPage} />
						</Switch>
					</Container>
				</Router>
			</AuthProvider>
		</ApolloProvider>
	); 
}

export default App;
