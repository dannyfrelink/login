import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useAppContext } from "../config/AppContext";

const Register = () => {
	const [error, setError] = useState<string[]>([]);
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

		await fetch("/checkRegister", {
			method: "POST",
			body: JSON.stringify({
				username,
				password,
			}),
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
					setError(log.errors);
				}
			});
	};

	return (
		<div id="login">
			<form method="POST">
				<h1>Register</h1>

				<TextField
					onChange={handleChange}
					variant="filled"
					label="Username"
					name="username"
					required
					error={error.includes("username") && true}
					helperText={
						error.includes("username") && "Username already in use."
					}
				/>
				<TextField
					onChange={handleChange}
					variant="filled"
					label="Password"
					name="password"
					required
					error={error.includes("password") && true}
					helperText={
						error.includes("password") &&
						"Use capital, number and special character."
					}
				/>

				<Button
					onClick={handleSubmit}
					variant="contained"
					disabled={username && password ? false : true}
				>
					Register
				</Button>
			</form>
		</div>
	);
};

export default Register;
