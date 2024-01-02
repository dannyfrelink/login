import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAppContext } from "./AppContext";
import Home from "../pages/Home";
import Login from "../pages/Login";

const AppRouter: React.FC = () => {
	const { username } = useAppContext();
	return (
		<Router>
			<Routes>
				<Route path="/" element={username ? <Home /> : <Login />} />
			</Routes>
		</Router>
	);
};

export default AppRouter;
