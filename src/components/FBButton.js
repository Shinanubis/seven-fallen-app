import React from 'react'
import FacebookLogin from 'react-facebook-login'
import './FBButton.css'
import dotenv from 'dotenv'
dotenv.config();

function FBButton(){

    // const [settings, setSettings] = useState({
    //     isLoggedIn: false,
    //     userID: '',
    //     name: '',
    //     email:'',
    //     picture:''
    // });

    const componentClicked = () => {
        console.log("Clicked")
    };
    const responseFacebook = response => console.log(response);
    

    return (
        <>
            <FacebookLogin
                cssClass = "FBButton"
                appId={process.env.REACT_APP_FACEBOOK_ID}
                autoLoad={false}
                fields="name,email,picture"
                onClick={componentClicked}
                callback={responseFacebook}
                textButton="Sign on Facebook" 
            />
        </>
    );
}

export default FBButton;