import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

// Mock the fetch function
const mockedFetch = jest.fn();
global.fetch = mockedFetch as jest.MockedFunction<typeof fetch>;

afterEach(() => {
	localStorage.clear();
});

describe("Login & Register", () => {
	it("should render Login page and perform login", async () => {
		render(<App />);

		// Check if the page is rendered
		expect(
			screen.getByRole("heading", { name: "Login" })
		).toBeInTheDocument();

		const usernameInput = screen.getByLabelText("Username *");
		const passwordInput = screen.getByLabelText("Password *");

		fireEvent.change(usernameInput, { target: { value: "testUser" } });
		fireEvent.change(passwordInput, { target: { value: "testPassword" } });

		// Check if input fields are filled
		expect(usernameInput).toHaveValue("testUser");
		expect(passwordInput).toHaveValue("testPassword");

		// Mock the fetch response
		mockedFetch.mockResolvedValueOnce({
			json: async () => ({ success: true, authToken: "fakeAuthToken" }),
		});

		// Click the Login button
		fireEvent.click(screen.getByRole("button", { name: "Login" }));

		// Wait for the asynchronous operation to complete
		await waitFor(() => {
			// Check if the "Welcome ${username}" heading is present after successful login
			expect(screen.getByText("Welcome testUser")).toBeInTheDocument();
		});

		// Check if localStorage is updated
		expect(localStorage.getItem("authToken")).toBe("fakeAuthToken");
		expect(localStorage.getItem("user")).toBe("testUser");
	});

	it("should render Register page and perform register", async () => {
		render(<App />);

		// Switch to Register page
		fireEvent.click(screen.getByRole("button", { name: "Register" }));

		// Check if the page is rendered
		expect(
			screen.getByRole("heading", { name: "Register" })
		).toBeInTheDocument();

		const usernameInput = screen.getByLabelText("Username *");
		const passwordInput = screen.getByLabelText("Password *");

		fireEvent.change(usernameInput, { target: { value: "testUser" } });
		fireEvent.change(passwordInput, { target: { value: "testPassword" } });

		// Check if input fields are filled
		expect(usernameInput).toHaveValue("testUser");
		expect(passwordInput).toHaveValue("testPassword");

		// Mock the fetch response
		mockedFetch.mockResolvedValueOnce({
			json: async () => ({ success: true, authToken: "fakeAuthToken" }),
		});

		// Click the Register button
		fireEvent.click(screen.getByRole("button", { name: "Register" }));

		// Wait for the asynchronous operation to complete
		await waitFor(() => {
			// Check if the "Welcome ${username}" heading is present after successful register
			expect(screen.getByText("Welcome testUser")).toBeInTheDocument();
		});

		// Check if localStorage is updated
		expect(localStorage.getItem("authToken")).toBe("fakeAuthToken");
		expect(localStorage.getItem("user")).toBe("testUser");
	});
});
