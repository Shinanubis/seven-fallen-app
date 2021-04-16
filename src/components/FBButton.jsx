import React from 'react'
import axios from 'axios'
import FacebookLogin from 'react-facebook-login'
import './FBButton.css'
import {ImFacebook} from 'react-icons/im'
import dotenv from 'dotenv'
dotenv.config();



function FBButton(props){

    function responseFacebook(res){
        fetch("http://localhost:5000/auth/facebook",{
            method:'post',
            mode:'cors',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                accessToken: res.accessToken
            })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }


    return (
        <>
            <FacebookLogin
                cssClass = "btn btn__social fb-color"
                appId={process.env.REACT_APP_FACEBOOK_ID}
                autoLoad={false}
                callback={responseFacebook}
                textButton=""
                icon={<ImFacebook className={"icons facebook__icon"}/>}
            />
        </>
    );
}

export default FBButton;