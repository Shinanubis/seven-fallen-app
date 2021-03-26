import React from 'react'
import FacebookLogin from 'react-facebook-login'
import './FBButton.css'
import {ImFacebook} from 'react-icons'
import dotenv from 'dotenv'
dotenv.config();

function FBButton(props){

    // const [settings, setSettings] = useState({
    //     isLoggedIn: false,
    //     userID: '',
    //     name: '',
    //     email:'',
    //     picture:''
    // });
    const bgcolor = props.bgcolor
    const componentClicked = () => {
        console.log("Clicked")
    };
    const responseFacebook = response => console.log(response);
    

    return (
        <>

            <FacebookLogin
                cssClass = "btn btn__social fb-color"
                appId={process.env.REACT_APP_FACEBOOK_ID}
                autoLoad={false}
                fields="name,email,picture"
                onClick={componentClicked}
                callback={responseFacebook}
                textButton="Sign on Facebook"
                icon="fa-facebook"
            />
        </>
    );
}

export default FBButton;