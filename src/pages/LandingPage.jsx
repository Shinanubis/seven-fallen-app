import {useEffect, useState} from 'react';
import { Redirect } from "react-router-dom";
import {getAuthUser} from '../api/Authentication';

const LandingPage = (props) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(async () => {
		let response = await getAuthUser();
	}, [])

	return <p>{"Hello"}</p>;
};

export default LandingPage;
