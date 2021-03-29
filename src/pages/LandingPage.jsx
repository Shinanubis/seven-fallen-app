import React from 'react'
import Button from '../components/Button'
import { useHistory } from "react-router-dom";

const LandingPage = (props) => {
    
    let history = useHistory();

    const handleConnexion = (e,uri) => {
        e.preventDefault();
        history.push(uri)
    }

    const handleSubscribe = () => {
        return;
    }
 
    return (
            <>
                <Button classes="btn" text="Connexion" onClick={e => handleConnexion(e,'/login')}/>
                <Button classes="btn" text="Subscribe" onClick={handleSubscribe}/>
            </>
    )
}

export default LandingPage;
