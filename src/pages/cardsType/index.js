//hooks import
import {useParams} from 'react-router-dom';
import {useEffect, useState, useContext, useRef} from 'react';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

//api
import {
        getCardsByType, 
        getCardById, 
        getCardsByMultipleOption, 
        getClassesList,
        getCardsByName
    } from '../../api/CardsWareHouse';

//components
import {FiLoader} from 'react-icons/fi';
import {RiLoader3Fill} from 'react-icons/ri';
import Loader from '../../components/Loader';
import ImageLoader from '../../components/imageLoader';
import Form from '../../components/form';

//style
import './style.css';

//datas
import kingdomsDatas from '../../settings/kingdom';

//contexts imports
import {SessionContext} from '../../contexts/SessionContext';

//utils
import {debounce, difference} from 'lodash';

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

    const [formTop, setFormtop] = useState({
        kingdoms: [],
        classeChoice: '',
        classesList: [],
        classes: "",
        name: ""
    });

    const [pageLoaded, setPageLoaded] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    //hooks
    const {id} = useParams();
    const [loading, setIsLoading, setRef, parentRef] = useInfiniteScroll(hasMore, formTop, () => {
        if(cardsList.page > 1){
            setCardsList({
                ...cardsList,
                page: 1
            })
        }
    });

    //handlers 
    const handleChange = debounce((e) => {
        e.stopPropagation();
        if(e.target.name === "kingdom"){
            setFormtop(prevState => {
                let newObj = {...prevState};
                let index = newObj.kingdoms.indexOf(e.target.id);
                if(index > -1){
                    newObj.kingdoms.splice(index, 1)
                }else{
                    newObj.kingdoms.push(e.target.id);
                }

                console.log("prevstate : ", prevState)
                console.log("newObj : ", newObj)
                parentRef.current.scrollTo({
                    top:0
                })
                setCardsList({
                    ...cardsList,
                    page:1
                })
                return newObj;
            })
        }

        switch(e.target.id){
            case "classes":
                if(e.target.value === ''){
                    return setFormtop({
                        ...formTop,
                        classes: ""
                    });
                }
                return setFormtop({
                    ...formTop,
                    classes: e.target.value
                });
            case "card-name":
                return setFormtop({
                    ...formTop,
                    name: e.target.value
                });        
            default:
                return;
        }
    }, 200);

    const handleClasseChoice = function(id){  
        setFormtop({
            ...formTop,
            classeChoice: id
        })
    }

    useEffect(async () => {
        let response = '';
        let options = {
            kingdoms: [...formTop.kingdoms],
            classes: formTop.classeChoice,
            name: formTop.name
        };

        if(formTop.classes.length === 0){
            options.classes = '';
        }

        response = await getCardsByMultipleOption(cardsList.page, cardsList.limit, lang, options , id);

        if(response.code === 200){

            if(pageLoaded === false){
                setPageLoaded(true);
            }

            if(loading === true){
                setIsLoading(false);
            }

            if(cardsList.page === 1){
                return setCardsList({
                    ...cardsList,
                    count: response.message[0],
                    cards: [...response.message[1]]
                })
            }else{
                return setCardsList({
                    ...cardsList,
                    count: response.message[0],
                    cards: [...cardsList.cards, ...response.message[1]]
                })
            }
        }

    },[
        JSON.stringify(formTop.kingdoms),
        cardsList.page
    ])

    useEffect(async () => {
        let responseClasses = '';
        if(formTop.classes.length > 0){
            responseClasses = await getClassesList(lang, formTop.classes);
            if(responseClasses.code === 200){
                return setFormtop({
                    ...formTop,
                    classesList: responseClasses.message[1]
                })
            }
        }

    }, [formTop.classes])

    useEffect(() => {
            if(loading && cardsList.cards.length === cardsList.count){
                setIsLoading(false)
            }

            if(loading === true && cardsList.cards.length < cardsList.count){
                return setCardsList({
                    ...cardsList,
                    page: cardsList.page + 1
                })
            }
    }, [loading])

    return (
        pageLoaded ?
        <div className="card__type container">
                    <Form onChange={(e) => handleChange(e)}>
                        <Form.Group>
                            <Form.Title text="Royaumes" />
                            <div className="kingdoms__list">
                                {session.kingdoms.length > 0 &&
                                    session.kingdoms.map(elmt =>{
                                        return (
                                            <>
                                                <Form.Label htmlFor={elmt.id}>
                                                    <img 
                                                        key={elmt.id} 
                                                        className={formTop.kingdoms.indexOf(elmt.id + "") > -1 ? "kingdom__img opacity-4" : "kingdom__img"}
                                                        src={kingdomsDatas[elmt.id].icon_url}
                                                    />
                                                    <Form.Checkbox 
                                                        id={elmt.id} 
                                                        classes="d-none" 
                                                        name="kingdom" 
                                                        value={elmt.id} 
                                                    />
                                                </Form.Label>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <Form.List
                                id="classes" 
                                placeholder="classes" 
                                listId="classes__list" 
                                dataList={formTop.classesList} 
                                placeholder="classes"
                                setValue = {handleClasseChoice}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Text id="card-name" placeholder="name"/>
                        </Form.Group>
                    </Form>
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
                    </div>
        </div>
        :
        <Loader loaderIcon={FiLoader}/>
    )
}

export default CardsType;
