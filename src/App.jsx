import { useEffect, useState } from "react";
import useLocalStorage from './hooks/useLocalStorage';

//Layout element import
import Footer from "./layouts/Footer";
import Menu from "./components/Menu";

//Settings import
import { BrowserRouter as Router, Switch, useHistory } from "react-router-dom";

//Components imports
import Navigation from "./components/Navigation";

// Pages import
import LandingPage from "./pages/LandingPage";
import DecksPage from "./pages/DecksPage";
import CardsPage from "./pages/CardsPage";
import ProfilePage from "./pages/ProfilePage";
import GamersPage from "./pages/GamersPage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import SettingsDeckPage from "./pages/SettingsDeckPage";
import AddingDeckPage from "./pages/AddingDeckPage";
import ChoicePage from "./pages/ChoicePage";
import StarterPage from "./pages/StarterPage";
import IndividualPage from "./pages/IndividualPage";
import DeckBuildOptions from "./pages/DeckBuildOptions";
import DeckImport from "./pages/DeckImport";
import EmptyDecksList from "./pages/EmptyDecksList";
import ModifyDeckPage from "./pages/ModifyDeckPage";

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
import AddingSubDecksCardsPage from "./pages/AddingSubDecksPage";
import getAuthUser from "./api/Authentication";

function App() {
	const pages = [
		{
			exact: true,
			path: "/",
			component: LandingPage,
		},
		{
			strict: true,
			path: "/login",
			component: LoginPage,
		},
		{
			strict: true,
			path: "/profile",
			component: ProfilePage,
		},
		{
			exact: true,
			strict: true,
			path: "/decks",
			component: DecksPage,
		},
		{
			exact: true,
			strict: true,
			path: "/decks/create",
			component: AddingDeckPage,
		},
		{
			exact: true,
			strict: true,
			path: "/decks/empty",
			component: EmptyDecksList,
			props: { text: "No Decks " },
		},
		{
			exact: true,
			strict: true,
			path: "/decks/:id",
			component: ModifyDeckPage,
		},
		{
			exact: true,
			strict: true,
			path: "/decks/:id/eden",
			component: AddingSubDecksCardsPage,
		},
		{
			exact: true,
			strict: true,
			path: "/decks/:id/register",
			component: AddingSubDecksCardsPage,
		},
		{
			exact: true,
			strict: true,
			path: "/decks/:id/holybook",
			component: AddingSubDecksCardsPage,
		},
		{
			exact: true,
			strict: true,
			path: "/decks/new-deck/build",
			component: DeckBuildOptions,
		},
		{
			exact: true,
			strict: true,
			path: "/decks/new-deck/import",
			component: DeckImport,
		},
		{
			exact: true,
			strict: true,
			path: "/cards",
			component: CardsPage,
		},
		{
			exact: true,
			strict: true,
			path: "/cards/from",
			component: ChoicePage,
		},
		{
			strict: true,
			path: "/cards/from/starter",
			component: StarterPage,
		},
		{
			strict: true,
			path: "/cards/from/individual",
			component: IndividualPage,
		},
		{
			strict: true,
			path: "/deck/:name",
			component: SettingsDeckPage,
		},
		{
			strict: true,
			path: "/gamers",
			component: GamersPage,
		},
		{
			component: ErrorPage,
		},
	];

	const [getItem, setItem, removeItem, clearStorage] = useLocalStorage();

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

		let responseAuth = await getAuthUser();
		
		if(responseAuth){
			setItem("7fallen", JSON.stringify(responseAuth))
		}
		console.log(responseAuth)
	}, []);

	return (
		<>
			<VhInPixels />
			<Router basename="/">
				<Navigation pages={pages} isAuthenticated={JSON.parse(getItem("7fallen").isAuthenticated)}/>
			</Router>
		</>
	);
}

export default App;
