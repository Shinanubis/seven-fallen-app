import useLocalStorage from "../hooks/useLocalStorage";
import { Redirect } from "react-router-dom";
import Loader from '../components/Loader';
import {RiLoader3Line} from 'react-icons/ri';
import {useEffect, useState} from 'react';
import getAuthUser from '../api/Authentication';

const LandingPage = (props) => {
	const [
			getItem, 
			setItem, 
			removeItem, 
			clearStorage
		] = useLocalStorage();

		useEffect(async () => {
			let response = await getAuthUser();
			setItem("7fallen", JSON.stringify(response))
		},[]);

		if(JSON.parse(getItem("7fallen")).isAuthenticated === true ){
			return <Redirect to="/decks"/>
		}else{
			return <Redirect to ="/login"/>
		}

}

export default LandingPage;
