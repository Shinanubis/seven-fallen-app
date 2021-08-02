import { useEffect, useContext, useState } from "react";
import useSessionStorage from "./hooks/useSessionStorage";

//Settings import
import { BrowserRouter as Router } from "react-router-dom";

//Components imports
import AuthorizedRoutes from "./components/AuthorizedRoutes";
import Loader from './components/Loader';
import BottomNavbar from "./components/BottomNavbar";
import Navbar from './components/navbar';

//Utilities import
import VhInPixels from "./utilities/VhInPixels";
import {
	getRaritiesList,
	getTypesList,
	getKingdomsList,
	getExtensionsList,
} from "./api/CardsWareHouse";


//Contexts
import { AuthContext } from "./contexts/AuthContext";
import { PagesContext } from "./contexts/PagesContext";

//components
import { RiLoader3Fill } from "react-icons/ri";


function App() {
	//context
	const [isAuthenticated, setIsAuthenticated] = useContext(AuthContext);
	const [pagesAuthenticated, pagesUnAuthenticated] = useContext(PagesContext);

	//states
	const [loaded, setLoaded] = useState(false);

	//hooks
	const [getItem, setItem, removeItem, clearStorage] = useSessionStorage();



	useEffect(async () => {
		if (!getItem("types")) {
			let types = await getTypesList("FR");
			setItem("types", JSON.stringify(types));
		}

		if (!getItem("kingdoms")) {
			let kingdoms = await getKingdomsList("FR");
			setItem("kingdoms", JSON.stringify(kingdoms));
		}

		if (!getItem("rarities")) {
			let rarities = await getRaritiesList("FR");
			setItem("rarities", JSON.stringify(rarities));
		}

		if (!getItem("extensions")) {
			let extensions = await getExtensionsList("FR");
			setItem("extensions", JSON.stringify(extensions));
		}

	}, []);

	return (
		<>
			<VhInPixels />
			{isAuthenticated !== undefined && loaded === true ?
				<Router basename="/">
					<AuthorizedRoutes
						unAuthenticatedPages={pagesUnAuthenticated}
						authenticatedPages={pagesAuthenticated}
						isAuthenticated={isAuthenticated}
					/>
					{isAuthenticated === true && <BottomNavbar />}
				</Router>
				:
				<Loader condition={isAuthenticated === false ||
					isAuthenticated === true}
					setLoaded={setLoaded}
					loaderIcon={RiLoader3Fill}
				/>
			}
		</>
	);
}

export default App;
