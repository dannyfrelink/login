import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAppContext } from "./AppContext";
import Home from "../pages/Home";
import Login from "../pages/Login";

const AppRouter: React.FC = () => {
	const { login } = useAppContext();
	return (
		<Router>
			<Routes>
				<Route path="/" element={login ? <Home /> : <Login />} />
			</Routes>
		</Router>
	);
};

export default AppRouter;
