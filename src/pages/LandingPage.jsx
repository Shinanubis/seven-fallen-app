import useLocalStorage from "../hooks/useLocalStorage";
import { Redirect } from "react-router-dom";
import Loader from '../components/Loader';
import {RiLoader3Line} from 'react-icons/ri';
import {useEffect} from 'react';
import getAuthUser from '../api/Authentication';

const LandingPage = (props) => {

	const [
			getItem, 
			setItem, 
			removeItem, 
			clearStorage
		] = useLocalStorage();

		useEffect(async () => {
			if(JSON.parse(getItem("7fallen"))){
				removeItem("7fallen")
			}
			let response = await getAuthUser();
			if(response.code === 200){
				setItem("7fallen", JSON.stringify(response))
			}
			console.log(JSON.parse(getItem("7fallen")))
		},[]);

		if(JSON.parse(getItem("7fallen")).isAuthenticated === true 
		   && JSON.parse()){
			return <Redirect to="/decks"/>
		}else{
			return <Redirect to ="/login"/>
		}

}

export default LandingPage;
