import "./LoginPage.css";
//contexts
import { AuthContext } from '../contexts/AuthContext';

//hooks
import { useEffect, useContext } from "react";

//components
import SocialButton from "../components/SocialButton";
import wizard from "../img/wizard.jpg";
import logo from "../img/logos/7-fallen-logo-2.png";

//environment variables
import dotenv from "dotenv";
dotenv.config();



function Login(props) {

	//contexts
	const [isAuthenticated] = useContext(AuthContext);

	//handlers
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
			<img className="logo mb-6" src={logo} alt="logo de 7 fallen" />
			<div className="w-100">
				<p className="mb-2">Deckbuilder v1.0</p>
				<div
					className="row justify-center mb-2"
					onClick={handleLanguage}
				>
					<div id="fr" className="language__choice">
						FR
					</div>
					<span>&nbsp;-&nbsp;</span>
					<div id="en" className="language__choice">
						EN
					</div>
				</div>
			</div>
			<div className="w-100 mb-3">
				<ul className="social__icons--list">
					{isAuthenticated === true ?
						<li>
							<SocialButton
								bgcolor="#d32f2f"
								url="https://test-seven.site/api/auth/logout"
								classes="btn btn__social rounded"
							>
								<span className="btn__social--text">Se déconnecter</span>
							</SocialButton>
						</li>
						:
						<>
							<p className="infos mb-1">Se connecter</p>
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
						</>}
				</ul>

			</div>
		</div>
	);
}

export default Login;
