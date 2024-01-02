import React, { createContext, useState, useContext } from "react";

interface AppContextProps {
	// Define your context state and any functions you need
	username: string;
	password: string;
	setUsername: React.Dispatch<React.SetStateAction<string>>;
	setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProps {
	children: JSX.Element;
}

export const AppProvider: React.FC<AppProps> = ({ children }) => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const contextValue: AppContextProps = {
		username,
		password,
		setUsername,
		setPassword,
	};

	return (
		<AppContext.Provider value={contextValue}>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error("useAppContext must be used within an AppProvider");
	}
	return context;
};
