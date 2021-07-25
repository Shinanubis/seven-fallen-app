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

		setItem("pablo", "hello")

		return (
			<>
				{console.log(getItem("pablo"))}
			</>
		);

}

export default LandingPage;
