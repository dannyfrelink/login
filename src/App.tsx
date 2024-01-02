import "./App.scss";
import { AppProvider } from "./config/AppContext";
import AppRouter from "./config/AppRouter";

function App() {
	return (
		<AppProvider>
			<AppRouter />
		</AppProvider>
	);
}

export default App;
