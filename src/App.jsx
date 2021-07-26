import { useEffect, useContext, useState } from "react";

//Settings import
import { BrowserRouter as Router } from "react-router-dom";

//Components imports
import AuthorizedRoutes from "./components/AuthorizedRoutes";
import Loader from './components/Loader';

//Utilities import
import VhInPixels from "./utilities/VhInPixels";
import {
	getRaritiesList,
	getTypesList,
	getKingdomsList,
	getCapacitiesList,
	getExtensionsList,
	getSubdeckCards,
	getClassesList,
} from "./api/CardsWareHouse";


//Contexts
import { AuthContext } from "./contexts/AuthContext";
import { PagesContext } from "./contexts/PagesContext";

//components
import { RiLoader3Fill } from "react-icons/ri";


function App() {
	const [isAuthenticated, setIsAuthenticated] = useContext(AuthContext);
	const [pagesAuthenticated, pagesUnAuthenticated] = useContext(PagesContext);
	const [loaded, setLoaded] = useState(false);

	useEffect(async () => {
		if (!sessionStorage.getItem("types")) {
			let types = await getTypesList("FR");
			sessionStorage.setItem("types", JSON.stringify(types));
		}

		if (!sessionStorage.getItem("kingdoms")) {
			let kingdoms = await getKingdomsList("FR");
			sessionStorage.setItem("kingdoms", JSON.stringify(kingdoms));
		}

		if (!sessionStorage.getItem("rarities")) {
			let rarities = await getRaritiesList("FR");
			sessionStorage.setItem("rarities", JSON.stringify(rarities));
		}

		if (!sessionStorage.getItem("extensions")) {
			let extensions = await getExtensionsList("FR");
			sessionStorage.setItem("extensions", JSON.stringify(extensions));
		}
	}, []);

	return (
		<>
			<VhInPixels />
			{isAuthenticated && loaded === true ?
				<Router basename="/">
					<AuthorizedRoutes
						unAuthenticatedPages={pagesUnAuthenticated}
						authenticatedPages={pagesAuthenticated}
						isAuthenticated={isAuthenticated}
					/>
				</Router>
				:
				<Loader condition={isAuthenticated} 
						setLoaded={setLoaded} 
						loaderIcon={RiLoader3Fill}
				/>
			}
		</>
	);
}

export default App;
