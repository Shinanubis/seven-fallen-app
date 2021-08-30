import "./LoginPage.css";

//Translation
import i18n from "../../i18n";
import {useTranslation} from "react-i18next";

//contexts
import { AuthContext } from '../../contexts/AuthContext';
import { SessionContext } from "../../contexts/SessionContext";

//hooks
import { useEffect, useContext } from "react";

//components
import SocialButton from "../../components/SocialButton";
import wizard from "../../img/backgrounds/leana.jpg";
import logo from "../../img/logos/7-fallen-logo-2.png";

//environment variables
import dotenv from "dotenv";
import useLocalStorage from "../../hooks/useLocalStorage";
dotenv.config();



function Login(props) {

	//hooks
	const [isAuthenticated] = useContext(AuthContext);
	const [session, setLanguage] = useContext(SessionContext); 

	const [getItem, setItem, removeItem, clearStorage] = useLocalStorage();
	const {t} = useTranslation();

	//handlers
	const handleLanguage = (e) => {
		i18n.changeLanguage(e.target.id);
		setLanguage(e.target.id);
	};

	return (
		<div
			className="login page"
			style={{ backgroundImage: `url(${wizard})` }}
		>
			<header className="heading">
				<img className="logo" src={logo} alt="logo de 7 fallen" />
				<div className="content">
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
			</header>
			<div className="w-100">
				<ul className="social__icons--list">
					{isAuthenticated === true ?
						<li>
							<SocialButton
								bgcolor="#d32f2f"
								url="https://test-seven.site/api/auth/logout"
								classes="btn btn__social rounded"
							>
								<span className="btn__social--text">{t("logout")}</span>
							</SocialButton>
						</li>
						:
						<>
							<p className="infos mb-1">{t("login")}</p>
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
