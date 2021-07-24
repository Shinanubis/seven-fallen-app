import { Redirect } from "react-router-dom";

const LandingPage = (props) => {
	const isAuthenticated = localStorage.getItem('isAuthenticated');

	if(isAuthenticated){
		return <Redirect to="/decks" />
	}

	return (
		<Redirect to="/login"/> 
	);
};

export default LandingPage;
