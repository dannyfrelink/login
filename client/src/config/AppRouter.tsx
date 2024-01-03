import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAppContext } from "./AppContext";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

const AppRouter: React.FC = () => {
	const { register } = useAppContext();
	const authToken = localStorage.getItem("authToken");

	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						authToken ? (
							<Home />
						) : register ? (
							<Register />
						) : (
							<Login />
						)
					}
				/>
			</Routes>
		</Router>
	);
};

export default AppRouter;
