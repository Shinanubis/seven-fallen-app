import "./LoginPage.css";
import React from "react";
import SocialButton from "../components/SocialButton";
import wizard from "../img/wizard.jpg";
import logo from "../img/logos/7-fallen-logo-2.png";
import dotenv from "dotenv";
dotenv.config();

function Login(props) {
	const handleLanguage = (e) => {
		if (e.target.id === "fr") {
			console.log("fr");
		}

		if (e.target.id === "en") {
			console.log("en");
		}
	};

	return (
		<div
			className="login page"
			style={{ backgroundImage: `url(${wizard})` }}
		>
			<img className="logo" src={logo} alt="logo de 7 fallen" />
			<div className="language mb-2">
				<div
					id="fr"
					className="language__choice"
					onClick={handleLanguage}
				>
					FR
				</div>
				<span>&nbsp-&nbsp</span>
				<div id="en" className="language__choice">
					EN
				</div>
			</div>
			<span className="infos mb-1">Se connecter</span>
			<ul className="social__icons--list">
				<li className="mb-3">
					<SocialButton
						bgcolor="#395693"
						url="https://test-seven.site/api/auth/facebook"
						classes="btn btn__social rounded"
					>
						<span className="btn__social--text">Facebook</span>
					</SocialButton>
				</li>
				<li>
					<SocialButton
						bgcolor="#F7F7F7"
						url="https://test-seven.site/api/auth/google"
						color="#606060"
						classes="btn btn__social rounded"
					>
						<span className="btn__social--text">Google</span>
					</SocialButton>
				</li>
			</ul>
		</div>
	);
}

export default Login;
