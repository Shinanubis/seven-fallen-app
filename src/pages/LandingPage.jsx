import {useEffect} from "react";
import Button from "../components/Button";
import { Redirect } from "react-router-dom";

const LandingPage = (props) => {


	if(localStorage.getItem('authentication')){
		return <Redirect to="decks" />
	}

	return (
		<>
			<Button
				classes="btn rounded"
				text="Connexion"
			/>
		</>
	);
};

export default LandingPage;
