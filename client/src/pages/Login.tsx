import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useAppContext } from "../config/AppContext";

const Login = () => {
	const [error, setError] = useState<string>("");
	const { username, setUsername, password, setPassword, setLogin } =
		useAppContext();

	const handleChange = (e: any) => {
		const target = e.target;

		if (target.name === "username") {
			setUsername(target.value);
		} else {
			setPassword(target.value);
		}
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		await fetch(`/checkLogin?username=${username}&password=${password}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((log) => {
				if (log.success) {
					setUsername("");
					setPassword("");
					setLogin(true);
				} else {
					setError(log.error);
				}
			});
	};

	return (
		<div id="login">
			<form method="POST">
				<h1>Login</h1>

				<TextField
					onChange={handleChange}
					variant="filled"
					label="Username"
					name="username"
					required
					error={error === "username" && true}
					helperText={error === "username" && "Cannot find username."}
				/>
				<TextField
					onChange={handleChange}
					variant="filled"
					label="Password"
					name="password"
					required
					error={error === "password" && true}
					helperText={error === "password" && "Incorrect password."}
				/>

				<Button
					onClick={handleSubmit}
					variant="contained"
					disabled={username && password ? false : true}
				>
					Login
				</Button>
			</form>
		</div>
	);
};

export default Login;
