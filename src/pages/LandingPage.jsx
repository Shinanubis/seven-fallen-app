import React from "react";
import Button from "../components/Button";
import { useHistory } from "react-router-dom";

const LandingPage = (props) => {
	let history = useHistory();

	const handleConnexion = (e, uri) => {
		e.preventDefault();
		history.push(uri);
	};

	return (
		<>
			<Button
				classes="btn rounded"
				text="Connexion"
				onClick={(e) => handleConnexion(e, "/login")}
			/>
		</>
	);
};

export default LandingPage;
