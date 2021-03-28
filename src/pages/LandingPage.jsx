import React from 'react'
import AuthenticationContext from '../contexts/Context'
import Button from '../components/Button'

const LandingPage = (props) => {
 const handleSubscribe = () => {
     return;
 }
    return (
        <AuthenticationContext.Consumer>
        {
             obj => {
                 return (
                     <>
                         <Button classes="btn" text="Connexion" onClick={e => obj.setLogin(e)}/>
                         <Button classes="btn" text="Subscribe" onClick={handleSubscribe}/>
                     </>
                 )
             }
        }
        </AuthenticationContext.Consumer> 

    )
}

export default LandingPage;
