import {useEffect} from 'react';
import { Redirect } from "react-router-dom";
import {getAuthUser} from '../api/Authentication';

const LandingPage = (props) => {

	useEffect(async () => {
		let response = await getAuthUser();
		console.log(response)
	}, [])

	return <p>{"Hello"}</p>;
};

export default LandingPage;
