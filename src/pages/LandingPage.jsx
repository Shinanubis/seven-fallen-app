import useLocalStorage from "../hooks/useLocalStorage";
import { Redirect } from "react-router-dom";
import Loader from '../components/Loader';
import {RiLoader3Line} from 'react-icons/ri';

const LandingPage = (props) => {

	const [
			getItem, 
			setItem, 
			removeItem, 
			clearStorage
		] = useLocalStorage();

		if(getItem("authenticated") && getItem("authenticated") === true){
			return <Redirect to="/decks"/>
		}else{
			return <Redirect to ="/login"/>
		}

}

export default LandingPage;
