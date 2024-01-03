import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useAppContext } from "../config/AppContext";

const Login = () => {
	const [error, setError] = useState<string>("");
	const { username, setUsername, password, setPassword, setRegister } =
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
					const authToken = log.authToken;
					localStorage.setItem("authToken", authToken);
					localStorage.setItem("user", username);

					setUsername("");
					setPassword("");
				} else {
					setError(log.error);
				}
			});
	};

	return (
		<div className="container">
			<form>
				<div>
					<h1>Login</h1>
					<div>
						<p>No account?</p>
						<Button
							onClick={() => setRegister(true)}
							size="small"
							variant="outlined"
						>
							Register
						</Button>
					</div>
				</div>

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
					type="password"
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
