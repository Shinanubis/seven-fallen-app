import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

/*api*/
import {
	getEdenCards,
	getRegisterCards,
	getHolyBookCards,
} from "../api/CardsWareHouse";
import { getEdenCards as getUserEdenCards } from "../api/Eden";
import { getRegisterCards as getUserRegisterCards } from "../api/Register";
import { getHolyBookCards as getUserHolyBookCards } from "../api/HolyBook";

/*components*/
import Main from "../layouts/Main";
import Loader from "../components/Loader";
import { RiLoader3Line } from "react-icons/ri";
import Flash from "../components/Flash";
import Filters from "../components/Filters";
import CardsCounter from "../components/Cards__toolbox/CardsCounter";
import LoaderGif from "../img/22-2.gif";
import ImageLoader from "../img/Fading_lines.gif";

import dotenv from "dotenv";
import InfiniteListThree from "../components/InfiniteListThree";
dotenv.config();

function AddingSubDecksCardsPage(props) {
	/*states*/
	const [loaded, setLoaded] = useState(false);
	const [flashMessage, setFlashMessage] = useState(null);
	const [flashState, setFlashState] = useState(null);
	const [cardsResponse, setCardsResponse] = useState({
		code: "",
		message: "",
	});
	const [page, setPage] = useState(1);
	const [completeList, setCompleteList] = useState([]);
	const [size, setSize] = useState();
	const [imageLoaded, setImageLoaded] = useState([]);

	/*variables*/
	let endUrl = props.location.pathname.split("/");
	endUrl = endUrl[endUrl.length - 1];
	let { id } = useParams();

	/*handlers*/
	const handleFlash = (newFlashState) => {
		setFlashState(newFlashState);
	};

	const handleImageLoading = (e) => {
		if (e.target.id) {
			setImageLoaded((prevstate) => {
				let newState = { ...prevstate, [e.target.id]: true };
				return newState;
			});
		}
	};

	/*useEffects*/
	useEffect(async () => {
		let response = "";
		let userSubdeckResponse = "";
		let newCompleteList = [];
		if (endUrl === "eden") {
			response = await getEdenCards(page, 20, "FR");
			userSubdeckResponse = await getUserEdenCards(id);
		}

		if (endUrl === "register") {
			response = await getRegisterCards(page, 20, "FR");
			userSubdeckResponse = await getUserRegisterCards(id);
		}

		if (endUrl === "holybook") {
			response = await getHolyBookCards(page, 20, "FR");
			userSubdeckResponse = await getUserHolyBookCards(id);
		}

		setSize(response.message[0]);

		if (
			response.message[1] instanceof Array &&
			userSubdeckResponse.message[0].cards instanceof Array
		) {
			/*init complte list with qty property for each object*/
			newCompleteList = response.message[1].map((elmt) => {
				return !elmt.qty && { ...elmt, qty: 0 };
			});

			/*set the completeList qty */
			userSubdeckResponse.message[0].cards.map((elmt1) => {
				response.message[1].map((elmt2, index) => {
					if (elmt1[0] === elmt2.id) {
						return (newCompleteList[index].qty = elmt1[1]);
					}
				});
			});
			setCompleteList([...completeList, ...newCompleteList]);
		}
	}, [page]);

	useEffect(() => {
		if (loaded === false) {
			setLoaded(true);
		}

		let newImages = {};

		if (completeList instanceof Array) {
			completeList.map((elmt) => {
				newImages[elmt.id] = false;
			});
		}

		setImageLoaded(newImages);
	}, [completeList]);

	useEffect(() => {
		console.log(imageLoaded);
	}, [imageLoaded]);

	return loaded === true ? (
		<Main classes="subdeck page">
			<Filters containerClasses="filter__container row justify-end my-2" />
			{completeList instanceof Array && completeList !== null ? (
				<InfiniteListThree
					page={page}
					size={size}
					numberPerPage={20}
					datas={completeList}
					triggerAt={17}
					setPage={() => setPage(page + 1)}
					loaderListClasses="loader__image"
					loaderList={LoaderGif}
				>
					<ul
						className="subdeck list__content layout layout__1 mb-2"
						onLoad={handleImageLoading}
					>
						{completeList.map((elmt) => {
							return (
								<li key={elmt.id} className="card__container">
									<>
										<img
											id={elmt.id}
											className={
												imageLoaded[elmt.id] === true
													? "card__image"
													: "d-none"
											}
											src={
												process.env
													.REACT_APP_CARDS_STATIC +
												elmt.image_path
											}
											alt=""
										/>
										<CardsCounter
											classes={
												imageLoaded[elmt.id] === true
													? "card__counter"
													: "d-none"
											}
											value={elmt.qty}
										/>
									</>
									<div
										className={
											imageLoaded[elmt.id] === false
												? "loader__card--container row justify-center align-center"
												: "d-none"
										}
									>
										<img
											className="loader__image"
											src={ImageLoader}
											alt="image loader"
										/>
									</div>
								</li>
							);
						})}
					</ul>
				</InfiniteListThree>
			) : (
				<div>
					<p className="title">Empty</p>
				</div>
			)}
			<Flash
				classes="message__flash"
				errorClass="message__flash-error"
				successClass="message__flash-done"
				message={flashMessage ? flashMessage : "flash message"}
				timing={750}
				flash={flashState}
				handleFlash={handleFlash}
			/>
		</Main>
	) : (
		<Loader
			condition={cardsResponse.code === 200}
			loaderIcon={RiLoader3Line}
			setLoaded={setLoaded}
		/>
	);
}

export default AddingSubDecksCardsPage;
