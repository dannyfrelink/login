import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useAppContext } from "../config/AppContext";

const Login = () => {
	const [error, setError] = useState<boolean>(false);
	const [user, setUser] = useState<string>("");
	const [pass, setPass] = useState<string>("");
	const { setUsername, setPassword } = useAppContext();

	const handleChange = (e: any) => {
		const target = e.target;

		if (target.name === "username") {
			setUser(target.value);
		} else {
			setPass(target.value);
		}
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
	};

	return (
		<div id="login">
			<form method="POST" onSubmit={handleSubmit}>
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
					variant="contained"
					disabled={user && pass ? false : true}
				>
					Login
				</Button>
			</form>
		</div>
	);
};

export default Login;
