import {useEffect, useState} from 'react';
import { Redirect } from "react-router-dom";
import {getAuthUser} from '../api/Authentication';
import Loader from '../components/Loader';
import {RiLoader3Line} from 'react-icons/ri';

const LandingPage = (props) => {
	const [isAuthenticated, setIsAuthenticated] = useState();
	const [isLoaded, setLoaded] = useState();

	useEffect(async () => {
		let response = await getAuthUser();
		console.log(response)
		setIsAuthenticated(response.isAuthenticate);
		setLoaded(true);
		localStorage.setItem('isAuthenticated', response.isAuthenticate)
	}, [])

	if(isAuthenticated === true){
		return (
			<Redirect to="/decks"/>
		)
	}else if(isAuthenticated === false){
		return (
			<Redirect to="/login"/>
		)
	}else{
		return <Loader condition={isAuthenticated} loaderIcon={RiLoader3Line} setLoaded={setLoaded} />
	}
};

export default LandingPage;
