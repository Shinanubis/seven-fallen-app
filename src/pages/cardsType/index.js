//hooks import
import {useParams} from 'react-router-dom';
import {useEffect, useState, useContext} from 'react';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import {useTranslation} from 'react-i18next';

//api
import {
        getCardsByMultipleOption, 
        getClassesList,
        getCapacitiesList
    } from '../../api/CardsWareHouse';

import {
    getCardsByType as getCardsType, 
    updateCardsByType
} from '../../api/Cards';

//components
import {FiLoader} from 'react-icons/fi';
import {BiLoaderAlt} from 'react-icons/bi';
import {MdDone} from "react-icons/md";
import Loader from '../../components/Loader';
import ImageLoader from '../../components/imageLoader';
import Form from '../../components/form';
import Flash from '../../components/flashMessage';

//style
import './style.css';

//datas
import kingdomsDatas from '../../settings/kingdom';

//contexts imports
import {SessionContext} from '../../contexts/SessionContext';

//utils
import {debounce} from 'lodash';

//environment variables
import dotenv from 'dotenv';
dotenv.config();

function CardsType() {
    //variables
    const lang = localStorage.getItem('lang');

    //context
    // eslint-disable-next-line no-unused-vars
    const [session, setLang] = useContext(SessionContext);

    //states
    const [cardsList, setCardsList] = useState({
        count: 0,
        page: 1,
        limit: 10,
        cards: []
    });

    const [formIsOpen, setFormIsOpen] = useState(false);
    const [updateState, setUpdateState] = useState({
        pending: false,
        success: "",
        error: ""
    });

    const [formTop, setFormtop] = useState({
        kingdoms: [],
        classeChoice: '',
        raritieChoice: '',
        capacitieChoice: '',
        extensionChoice: '',
        extensionList: [],
        capacitiesList: [],
        raritieList: [],
        classesList: [],
        extensions: "",
        capacities: "",
        rarities: "",
        classes: "",
        name: "",
        loading: false,
    });

    const [pageLoaded, setPageLoaded] = useState(false);
    const [cardsChoice, setCardsChoice] = useState({})

    //hooks
    const {id, deckId} = useParams();
    const [loading, setIsLoading, setRef, parentRef] = useInfiniteScroll();
    const [scrollTop, setScrollTop] = useState(false);
    const {t} = useTranslation();

    //handlers 
    const handleChange = debounce((e) => {
        e.stopPropagation();

        if(e.target.name === "kingdom"){
            setScrollTop(true)
            setFormtop(prevState => {
                let newObj = {...prevState};
                let index = newObj.kingdoms.indexOf(e.target.value);
                
                if(index > -1){
                    newObj.kingdoms.splice(index, 1)
                }else{
                    newObj.kingdoms.push(e.target.value);
                }

                return {...newObj};
            })
             
        }

        switch(e.target.id){
            case "capacities": 
                if(e.target.value === ''){                    
                    return setFormtop({
                        ...formTop,
                        capacitieChoice: ""
                    });
                }

                return setFormtop({
                    ...formTop,
                    capacities: e.target.value
                });

            case "rarities":
                if(e.target.value === ''){
                    setScrollTop(true);                    
                    return setFormtop({
                        ...formTop,
                        rarities: "",
                        raritieChoice: ""
                    });
                }

                let term = '^' + e.target.value;
                let rx = new RegExp(term,'i');
                let result = session.rarities.filter(elmt => rx.test(elmt.name) === true);

                return setFormtop({
                    ...formTop,
                    raritiesList: [...result]
                });

            case "extensions":
                if(e.target.value === ''){
                    setScrollTop(true);                    
                    return setFormtop({
                        ...formTop,
                        extensions: "",
                        extensionChoice: ""
                    });
                }
                let termForExtension = '^' + e.target.value;
                let rxForExtensions = new RegExp(termForExtension,'i');
                let resultForExtensions = session.extensions.filter(elmt => rxForExtensions.test(elmt.name) === true);

                return setFormtop({
                    ...formTop,
                    extensionsList: [...resultForExtensions]
                });

            case "classes":
                if(e.target.value === ''){                    
                    return setFormtop({
                        ...formTop,
                        classeChoice: ""
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
    }, 300);

    const handleExtensionChoice = async function(id){
        if(cardsList.page > 1){
            await setScrollTop(true)
        }

        return setFormtop({
            ...formTop,
            extensionChoice: id
        })
    }

    const handleValid = async function(){
        setUpdateState({
            ...updateState,
            pending: true
        })
    } 

    const handleRaritieChoice = async function(id){
        if(cardsList.page > 1){
            await setScrollTop(true)
        }

        return setFormtop({
            ...formTop,
            raritieChoice: id
        })
    }

    const handleClasseChoice = async function(id){
        if(cardsList.page > 1){
            await setScrollTop(true)
        }

        return setFormtop({
            ...formTop,
            classeChoice: id
        })
    }

    const handleCapacatieChoice = async function(id){
        if(cardsList.page > 1){
            await setScrollTop(true)
        }

        return setFormtop({
            ...formTop,
            capacitieChoice: id
        })
    }

    const handleFormOpening = function(e){
        if(e.target.id === "btn"){
            setFormIsOpen(!formIsOpen);
        }
    }

    const handleCardChoice = function(e){
        setCardsChoice(prevState => {
            let newCardsChoice = {...prevState};
            if(newCardsChoice[e.target.id]){
                delete newCardsChoice[e.target.id];
            }else{
                newCardsChoice[e.target.id] = {type:Number(id), qty:1}
            }
            return {...newCardsChoice};
        });
    }

    useEffect(() => {
        async function fetchDatasCardsType(){
            let responseCardsByType = await getCardsType(id,deckId);
            if(responseCardsByType.code === 200){
                setCardsChoice({...responseCardsByType.message});
            }
        };
        fetchDatasCardsType();
    },[]);

    useEffect(() => {
        if(scrollTop === true){
            parentRef.current.scrollTo(0,0);
        }

        setCardsList({
            ...cardsList,
            page: 1
        })
        return setScrollTop(false)
    }, [scrollTop])


    useEffect(async () => {
        let datas = {
            code : 404,
            message: []
        };

        let response = '';
        let responseMultiple = '';
        let options = {
            kingdoms: [...formTop.kingdoms],
            extensions: formTop.extensionChoice,
            rarities: formTop.raritieChoice,
            capacities: formTop.capacitieChoice,
            classes: formTop.classeChoice,
            name: formTop.name
        };
        
        if(formTop.classes.length === 0){
            options.classes = '';
        }

        if(formTop.capacities.length === 0){
            options.capacities = '';
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
                    cards: [...response.message[1]],
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
        formTop.name,
        formTop.extensionChoice,
        formTop.classeChoice,
        formTop.capacitieChoice,
        formTop.raritieChoice,
        JSON.stringify(formTop.kingdoms),
        cardsList.page
    ])


    useEffect(async () => {
        let responseCapacities = '';
        if(formTop.capacities.length > 0){
            responseCapacities = await getCapacitiesList(lang, formTop.capacities);
            if(responseCapacities.code === 200){
                return setFormtop({
                    ...formTop,
                    capacitiesList: responseCapacities.message[1]
                })
            }
        }
    }, [formTop.capacities])

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

    useEffect(async () => {
        let response = ''
        if(updateState.pending === true){
            response = await updateCardsByType(id, deckId, cardsChoice);
            if(response.code === 200){
                setUpdateState({
                    ...updateState,
                    pending:false,
                    success: response.message,
                    error: ""
                })
            }else{
                setUpdateState({
                    ...updateState,
                    pending: false,
                    error: response.message,
                    success: ""
                })
            } 
        } 
    },[updateState])

    useEffect(() => {
            if(loading && cardsList.cards.length === cardsList.count){
                setIsLoading(false)
            }

            if(loading && cardsList.cards.length < cardsList.count){
                return setCardsList({
                    ...cardsList,
                    page: cardsList.page + 1
                })
            }
    }, [loading])

    return (
        pageLoaded ?
        <div className="card__type container">
            <Flash success={updateState.success} error={updateState.error} setFlash={setUpdateState}/>
            <Form 
                classes={formIsOpen ? "form" : "form close"} 
                onChange={(e) => handleChange(e)}
                onClick={(e) => handleFormOpening(e)}
            >
                {formIsOpen === false && 
                    <Form.Group>
                        <Form.Button id="btn" text={t("filter")}/>
                    </Form.Group>
                }
                <Form.Group>
                    <Form.Title text={t("kingdom")} />
                    <div className="kingdoms__list">
                        {session.kingdoms.length > 0 &&
                            session.kingdoms.map(elmt =>{
                                return (
                                    <>
                                        <Form.Label htmlFor={elmt.id}>
                                            <img
                                                className={formTop.kingdoms.indexOf(elmt.id.toString()) > -1 ? "kingdom__img opacity-4" : "kingdom__img"}
                                                src={kingdomsDatas[elmt.id].icon_url}
                                            />
                                        </Form.Label>
                                        <Form.Checkbox
                                            key={elmt.id} 
                                            id={elmt.id} 
                                            classes="d-none" 
                                            name="kingdom" 
                                            value={elmt.id} 
                                        />
                                    </>
                                )
                            })
                        }
                    </div>
                </Form.Group>
               <Form.Group>
                    <Form.List
                        id="extension(s)" 
                        placeholder="extension(s)" 
                        listId="extensions__list" 
                        dataList={formTop.extensionsList} 
                        setValue = {handleExtensionChoice}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.List
                        id="rarities" 
                        placeholder={t("raritie")} 
                        listId="rarities__list" 
                        dataList={formTop.raritiesList} 
                        setValue = {handleRaritieChoice}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.List
                        id="classes" 
                        placeholder={t("class")} 
                        listId="classes__list" 
                        dataList={formTop.classesList} 
                        setValue = {handleClasseChoice}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.List
                        id="capacities" 
                        placeholder={t("capacitie")} 
                        listId="capacities__list" 
                        dataList={formTop.capacitiesList} 
                        setValue = {handleCapacatieChoice}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Text id="card-name" placeholder={t("name")}/>
                </Form.Group>
                <Form.Group>
                    <Form.Button id="btn" text={t("close")}/>
                </Form.Group>
            </Form>
            <div className="cards__container">
                <ul ref={setRef} className="cards__list" onClick={handleCardChoice}>
                    {cardsList &&
                        cardsList.cards.map(elmt => {
                            if(Number(id) === 1){
                                return (
                                    <ImageLoader id={elmt.id} variant="li" classes="cards__list--item divinity">
                                        <img 
                                            id={elmt.id} 
                                            className="card__img d-none" 
                                            src={process.env.REACT_APP_CARDS_STATIC + elmt.image_path} 
                                        />
                                        {cardsChoice[elmt.id] &&
                                            <div className="card__checked--box"> 
                                                <MdDone className="card__checked--icon"/>
                                            </div>
                                        }
                                    </ImageLoader>
                                )
                            }
                            return (
                                <ImageLoader 
                                    id={elmt.id} 
                                    variant="li" 
                                    classes={
                                        cardsChoice[elmt.id] 
                                        ? 
                                        "cards__list--item checked" 
                                        : 
                                        "cards__list--item"
                                    }
                                    >
                                    <img id={elmt.id} className="card__img" src={process.env.REACT_APP_CARDS_STATIC + elmt.image_path} />
                                    {cardsChoice[elmt.id] &&
                                        <div className="card__checked--box"> 
                                            <MdDone className="card__checked--icon"/>
                                        </div>
                                    }
                                </ImageLoader>
                            )
                        })
                    }
                    {loading && <div className="list__loader"><FiLoader className="loader"/></div>}
                </ul>
                    <div className="bottom-block">
                        <button type="button" id="btn" className="btn" onClick={handleValid}>
                            {updateState.pending && <BiLoaderAlt className="btn__loader"/>}
                            {t("valid")}
                        </button>
                    </div>
            </div>
        </div>
        :
        <Loader loaderIcon={FiLoader}/>
    )
}

export default CardsType;
