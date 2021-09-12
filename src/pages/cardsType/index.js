//hooks import
import {useParams} from 'react-router-dom';
import {useEffect, useState, useContext} from 'react';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

//api
import {getCardsByType, getCardById} from '../../api/CardsWareHouse';

//style
import './style.css';

//datas
import kingdomsDatas from '../../settings/kingdom';

//contexts imports
import {SessionContext} from '../../contexts/SessionContext';

//environment variables
import dotenv from 'dotenv';
dotenv.config();

function CardsType() {
    const lang = localStorage.getItem('lang');
    const {id} = useParams();
    const [session, setLang] = useContext(SessionContext);
    const [cardsList, setCardsList] = useState({
        num: 0,
        cards: []
    });

    useEffect(async () => {
        let cardsByType = await getCardsByType(1, 10, lang, id);
        if(cardsByType.code === 200){
           setCardsList({
               ...cardsList,
               num: cardsByType.message[0],
               cards: [...cardsByType.message[1]]
           }) 
        }

        let cardById = await getCardById(lang, 6);
        console.log(cardById);
    },[])

    useEffect(() => {
        console.log("[cardsList] : ", cardsList)
    },[cardsList])

    return (
        <div className="card__type container">
            <ul className="options__list">
                <li className="option__item">
                    <h3 className="options__item--title">Royaumes</h3>
                    <div className="kingdoms__list">
                        {session.kingdoms.length >= 0 &&
                            session.kingdoms.map(elmt => <img key={elmt.id} id={elmt.id} className="kingdom__img" src={kingdomsDatas[elmt.id].icon_url}/>)
                        }
                    </div>
                </li>
                <li className="option__item">
                </li>
                <li className="option__item">
                </li>
                <li className="option__item">
                </li>
                <li className="option__item">
                </li>
                <li className="option__item">
                </li>
            </ul>
            <div className="cards__container">
                <ul className="cards__list">
                    {cardsList &&
                        cardsList.cards.map(elmt => {
                            return (
                                <li key={elmt.id} className="cards__list--item">
                                    <img className="card__img" src={process.env.REACT_APP_CARDS_STATIC + elmt.image_path} />
                                </li>
                            )
                        })
                    }
                </ul>
                <div className="btn__banner">
                    <button className="create__deck--button" type="button">selectionner</button>
                </div>
            </div>
        </div>
    )
}

export default CardsType;
