import { Redirect } from "react-router-dom";
import {useContext} from "react";

import { AuthContext } from "../../contexts/AuthContext";


const LandingPage = (props) => {
		const [isAuthenticated, setIsAuthenticated] = useContext(AuthContext);

		if(isAuthenticated === true){
			return <Redirect to="/decks"/>
		}else{
			return <Redirect to ="/login"/>
		}

}

export default LandingPage;
