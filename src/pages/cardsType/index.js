//hooks import
import {useParams} from 'react-router-dom';
import {useEffect, useState, useContext} from 'react';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

//api
import {getCardsByType, getCardById} from '../../api/CardsWareHouse';

//components
import {FiLoader} from 'react-icons/fi';
import {RiLoader3Fill} from 'react-icons/ri';
import Loader from '../../components/Loader';
import ImageLoader from '../../components/imageLoader'

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
    //variables
    const lang = localStorage.getItem('lang');

    //context
    const [session, setLang] = useContext(SessionContext);

    //states
    const [cardsList, setCardsList] = useState({
        count: 0,
        page: 1,
        limit: 10,
        cards: []
    });
    const [pageLoaded, setPageLoaded] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    //hooks
    const {id} = useParams();
    const [loading, setIsLoading, setRef] = useInfiniteScroll(hasMore);

    useEffect(async () => {
        let cardsByType = await getCardsByType(1, 10, lang, id);
        if(cardsByType.code === 200){

            setPageLoaded(true);

           setCardsList({
               ...cardsList,
               count: cardsByType.message[0],
               cards: [...cardsList.cards, ...cardsByType.message[1]]
           });
        }

    }, [])

    useEffect(async () => {
        let cardsByType = await getCardsByType(cardsList.page, cardsList.limit, lang, id);
        if(cardsByType.code === 200){
           setCardsList({
               ...cardsList,
               count: cardsByType.message[0],
               cards: [...cardsList.cards, ...cardsByType.message[1]]
           });

           if(session.type && session.kingdoms){
               console.log("[session.type] : ", session.type)
               setPageLoaded(true)
           }

           setIsLoading(false);
        }

    },[cardsList.page])

    useEffect(() => {
        if(Number(id) === 1){
            if(loading === true && cardsList.cards.length < (cardsList.count - 1)){
                setHasMore(true)
                return setCardsList({
                    ...cardsList,
                    page: cardsList.page + 1
                })
            }
    
            if(loading === true && cardsList.cards.length === (cardsList.count - 1)){
                setHasMore(false);
                return setIsLoading(false);
            }
        }else{
            if(loading === true && cardsList.cards.length < cardsList.count){
                setHasMore(true)
                return setCardsList({
                    ...cardsList,
                    page: cardsList.page + 1
                })
            }

            if(loading === true && cardsList.cards.length === cardsList.count){
                setHasMore(false);
                return setIsLoading(false);
            }
        }
    
    }, [loading])

    return (
        pageLoaded === true ?
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
                            <h3 className="options__item--title">Classes</h3>
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
                        <ul ref={setRef} className="cards__list">
                            {cardsList &&
                                cardsList.cards.map(elmt => {
                                    if(Number(id) === 1){
                                        return (
                                            <ImageLoader id={elmt.id} variant="li" classes="cards__list--item divinity">
                                                <img id={elmt.id} className="card__img d-none" src={process.env.REACT_APP_CARDS_STATIC + elmt.image_path} />
                                            </ImageLoader>
                                        )
                                    }
                                    return (
                                        <ImageLoader id={elmt.id} variant="li" classes="cards__list--item">
                                            <img id={elmt.id} className="card__img" src={process.env.REACT_APP_CARDS_STATIC + elmt.image_path} />
                                        </ImageLoader>
                                    )
                                })
                            }
                            {loading && <div className="list__loader"><FiLoader className="loader"/></div>}
                        </ul>
                        <div className="btn__banner">
                            <button className="create__deck--button" type="button">selectionner</button>
                        </div>
                    </div>
        </div>
        :
        <Loader loaderIcon={FiLoader}/>
    )
}

export default CardsType;
