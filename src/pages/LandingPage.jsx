import {useEffect} from 'react';
import { Redirect } from "react-router-dom";
import {getAuthUser} from '../api/Authentication';

const LandingPage = (props) => {

	useEffect(async () => {
		let response = await getAuthUser();
		let data = await response.json();
		console.log(data)
	}, [])

	return (
		<Redirect to="/login"/> 
	);
};

export default LandingPage;
