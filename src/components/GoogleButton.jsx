import React from 'react'
import {GoogleLogin} from 'react-google-login'
import {FcGoogle} from 'react-icons/fc'
import dotenv from 'dotenv'
dotenv.config();



const GoogleButton = (props) => {

    const responseGoogle = (res) => {

        console.log(res.accessToken)
    }

    return (
        <>
            <GoogleLogin 
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                render={props => (
                        <button 
                            className="btn btn__social " 
                            onClick={props.onClick} style={{backgroundColor:"#ffffff"}}
                            disabled={props.disabled}
                        >
                            <FcGoogle className={"icons google__icon"} />
                        </button>
                )}
                buttonText=""
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </>
    )
}

export default GoogleButton
