import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useAppContext } from "../config/AppContext";

const Login = () => {
	const [error, setError] = useState<boolean>(false);
	const { username, setUsername, password, setPassword } = useAppContext();

	const handleChange = (e: any) => {
		const target = e.target;

		if (target.name === "username") {
			setUsername(target.value);
		} else {
			setPassword(target.value);
		}
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();

		fetch("/checkLogin", {
			method: "POST",
			body: JSON.stringify({
				username,
				password,
			}),
			headers: {
				"Content-Type": "application/json",
			},
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
					error={error}
					helperText={error && "Username already in use."}
				/>
				<TextField
					onChange={handleChange}
					variant="filled"
					label="Password"
					name="password"
					required
					error={error}
					helperText={
						error &&
						"Use minimal one capital, one number, one special character."
					}
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
