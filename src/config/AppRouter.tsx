import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import { useAppContext } from "./AppContext";
import Login from "../pages/Login";

const AppRouter: React.FC = () => {
	const { userName } = useAppContext();
	return (
		<Router>
			<Routes>
				<Route path="/" element={userName ? <Home /> : <Login />} />
			</Routes>
		</Router>
	);
};

export default AppRouter;
