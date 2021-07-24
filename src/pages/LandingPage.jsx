import {useEffect, useState} from 'react';
import { Redirect } from "react-router-dom";
import {getAuthUser} from '../api/Authentication';

const LandingPage = (props) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(async () => {
		let response = await getAuthUser();
		setIsAuthenticated(response.isAuthenticate);
		localStorage.setItem('isAuthenticated', response.isAuthenticate)
	}, [])

	if(isAuthenticated === true){
		return <Redirect to="/decks"/>
	}

	return (<Redirect to="/login"/>)
};

export default LandingPage;
