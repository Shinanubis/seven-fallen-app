import {useState, useEffect, useRef } from 'react';
import {useParams} from 'react-router-dom';

/*api*/
import {getEdenCards, getRegisterCards, getHolyBookCards} from '../api/CardsWareHouse';
import {getEdenCards as getUserEdenCards} from '../api/Eden';
import {getRegisterCards as getUserRegisterCards} from '../api/Register';
import {getHolyBookCards as getUserHolyBookCards} from '../api/HolyBook';

/*components*/
import Main from '../layouts/Main';
import Loader from '../components/Loader';
import {RiLoader3Line} from 'react-icons/ri';
import Flash from '../components/Flash';
import Filters from '../components/Filters';
import InfiniteListTwo from '../components/InfiniteListTwo';
import CardsCounter from '../components/Cards__toolbox/CardsCounter';
import LoaderGif from "../img/22-2.gif";

import dotenv from 'dotenv';
import InfiniteListThree from '../components/InfiniteListThree';
dotenv.config();

function AddingSubDecksCardsPage(props) {
    /*states*/
    const [loaded, setLoaded] = useState(false);
    const [flashMessage, setFlashMessage] = useState(null);
    const [flashState, setFlashState] = useState(null);
    const [cardsResponse, setCardsResponse] = useState({
        code: '',
        message: ''
    });
    const [page, setPage] = useState(1);
    const [completeList, setCompleteList] = useState([]);
    const [size, setSize] = useState();
    const [imageLoaded, setImageLoaded] = useState([]);

    /*variables*/
    let endUrl = props.location.pathname.split('/');
    endUrl = endUrl[endUrl.length - 1];
    let {id} = useParams();

    /*handlers*/
    const handleFlash = (newFlashState) => {
        setFlashState(newFlashState);
    }

    /*useEffects*/
    useEffect(async () => {
        let response = '';
        let userSubdeckResponse = '';
        let newCompleteList = []; 
        if(endUrl === 'eden'){
            response = await getEdenCards(page,10,'FR');
            userSubdeckResponse = await getUserEdenCards(id);
        }

        if(endUrl === 'register'){
            response = await getRegisterCards(page,10,'FR');
            userSubdeckResponse = await getUserRegisterCards(id);
        }

        if(endUrl === 'holybook'){
            response = await getHolyBookCards(page,10,'FR');
            userSubdeckResponse = await getUserHolyBookCards(id);
        }

        setSize(response.message[0]);

        if(response.message[1] instanceof Array && userSubdeckResponse.message[0].cards instanceof Array){
            /*init complte list with qty property for each object*/
            newCompleteList = response.message[1].map(elmt => {
                return !elmt.qty && {...elmt, qty: 0};
            })

            /*set the completeList qty */
            userSubdeckResponse.message[0].cards.map(elmt1 => {
                response.message[1].map((elmt2,index) => {
                    if(elmt1[0] === elmt2.id){
                        return  newCompleteList[index].qty = elmt1[1]; 
                    }
                })
            })
            console.log([...completeList, ...newCompleteList])
            setCompleteList([...completeList, ...newCompleteList]);
        }
        
    },[page]);

    useEffect(() => {
        if(loaded === false){
            setLoaded(true)
        }
    }, [completeList])

    useEffect(() => {
        let newImages = {};

        if(cardsResponse.message[1] instanceof Array){
            cardsResponse.message[1].map(elmt => {
                newImages[elmt.id] = false;    
            })
        }
        
        setImageLoaded(newImages);
    }, [cardsResponse.message[1]]);

    return loaded === true ? (
        <Main classes="subdeck page">
            <Filters containerClasses="filter__container row justify-end my-2" />
            {/* {Object.keys(completeList).length > 0 && 
                <InfiniteListTwo 
                    classesContainer="subdeck list__content layout layout__1 mb-2" 
                    classesElement="card__container"
                    classesImages="card__image"
                    classesLoaderList="loader__image"
                    datas={completeList}
                    size={cardsResponse.message[0]}
                    numPerPage={10}
                    page={page}
                    setPage={() => setPage(page + 1)}
                    triggerAt={9}
                />
            } */}
            {
                <InfiniteListThree 
                    page={page}
                    size={size}
                    numberPerPage = {10} 
                    datas={completeList}
                    triggerAt={7} 
                    setPage={() => setPage(page + 1)} 
                    loaderListClasses="loader__image" 
                    loaderList={LoaderGif}
                >
                    <ul className="subdeck list__content layout layout__1 mb-2">
                        {
                            completeList instanceof Array &&
                            completeList.length > 0 ? 
                            completeList.map(elmt => {
                                return (
                                    <li key={elmt.id} className="card__container">
                                        <img id={`image__${elmt.id}`} className="card__image" src={process.env.REACT_APP_CARDS_STATIC + elmt.image_path} alt="" />
                                        <CardsCounter classes="cards__counter" value={elmt.qty}/>
                                    </li>
                                )
                            })
                            :
                            null
                        }
                    </ul>
                </InfiniteListThree>
            }

            <Flash 
                classes="message__flash" 
                errorClass="message__flash-error" 
                successClass="message__flash-done" 
                message={flashMessage ? flashMessage : "flash message"}
                timing={750}
                flash={flashState}
                handleFlash= {handleFlash}
            />
        </Main>
    )
    :
    <Loader condition={cardsResponse.code === 200} loaderIcon={RiLoader3Line} setLoaded={setLoaded} />
    
}

export default AddingSubDecksCardsPage;
