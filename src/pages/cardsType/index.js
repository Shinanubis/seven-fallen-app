//hooks import
import {useParams} from 'react-router-dom';
import {useEffect, useState, useContext} from 'react';

//api
import {getCardsByType} from '../../api/CardsWareHouse';

//style
import './style.css';

//datas
import kingdomsDatas from '../../settings/kingdom';

//contexts imports
import {SessionContext} from '../../contexts/SessionContext';

function CardsType() {
    const lang = localStorage.getItem('lang');
    const {id} = useParams();
    const [session, setLang] = useContext(SessionContext);

    useEffect(async () => {
        let response = await getCardsByType(1, 10, lang, id);
        console.log(response)
    },[])

    return (
        <div className="card__type container">
            <ul className="options__list">
                <li className="option__item">
                    <h3 className="kingdoms__title">Royaumes</h3>
                    <div className="kingdoms__list">
                        {session.kingdoms.length >= 0 &&
                            session.kingdoms.map(elmt => <img className="kingdom__img" src={kingdomsDatas[elmt.id].icon_url}/>)
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
                </ul>
            </div>
        </div>
    )
}

export default CardsType;
