import React from 'react'
import Button from '../components/Button'
import Separator from '../components/Separator'
import { useHistory } from "react-router-dom";

const LandingPage = (props) => {
    
    let history = useHistory();

    const handleConnexion = (e,uri) => {
        e.preventDefault();
        history.push(uri)
    }
 
    return (
            <>
                <Button classes="btn" text="Connexion" onClick={e => handleConnexion(e,'/login')}/>
                <Separator/>
                <Button classes="btn" text="Subscribe" onClick={(e) => handleConnexion(e,'/subscribe')}/>
            </>
    )
}

export default LandingPage;
