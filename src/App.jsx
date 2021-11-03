import { useContext } from "react";

//Settings import
import { BrowserRouter as Router } from "react-router-dom";

//Components imports
import AuthorizedRoutes from "./components/AuthorizedRoutes";
import BottomNavbar from "./components/BottomNavbar";

//Utilities import
import VhInPixels from "./utilities/VhInPixels";

//Contexts
import { AuthContext } from "./contexts/AuthContext";
import { PagesContext } from "./contexts/PagesContext";

function App() {
	// eslint-disable-next-line no-unused-vars
	const [isAuthenticated, setIsAuthenticated] = useContext(AuthContext);
	const [pagesAuthenticated, pagesUnAuthenticated] = useContext(PagesContext);
	
	return (
		<>
			<VhInPixels />
				<Router basename="/">
					<AuthorizedRoutes
						unAuthenticatedPages={pagesUnAuthenticated}
						authenticatedPages={pagesAuthenticated}
						isAuthenticated={isAuthenticated}
					/>
					{isAuthenticated === true && <BottomNavbar />}
				</Router>
		</>
	);
}

export default App;
