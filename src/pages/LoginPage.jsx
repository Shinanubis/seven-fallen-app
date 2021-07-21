import "./LoginPage.css";
import React from "react";
import SocialButton from "../components/SocialButton";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import dotenv from "dotenv";
dotenv.config();

function Login(props) {
	return (
		<ul className="social__icons--list">
			<li className="mb-3">
				<SocialButton
					bgcolor="#395693"
					url="https://test-seven.site/api/auth/facebook"
				>
					<span className="btn__social--text">Login facebook</span>
				</SocialButton>
			</li>
			<li>
				<SocialButton
					bgcolor="#F7F7F7"
					url="https://test-seven.site/api/auth/google"
				>
					<span className="btn__social--text">Login Google</span>
				</SocialButton>
			</li>
		</ul>
	);
}

export default Login;
