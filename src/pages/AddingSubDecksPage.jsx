import {useState, useEffect } from 'react';

import {getEdenCards, getRegisterCards, getHolyBookCards} from '../api/CardsWareHouse';

import Main from '../layouts/Main';
import Loader from '../components/Loader';
import {RiLoader3Line} from 'react-icons/ri';
import Flash from '../components/Flash';
import Filters from '../components/Filters';
import Toolbar from '../components/Toolbar';
import {FiPlus, FiMinus} from 'react-icons/fi';
import InfiniteList from '../components/InfiniteList';
import InfiniteListTwo from '../components/InfiniteListTwo';
import LoaderGif from '../img/22-2.gif';

import dotenv from 'dotenv';
dotenv.config();

function AddingSubDecksCardsPage(props) {
    const [loaded, setLoaded] = useState(false);
    const [flashMessage, setFlashMessage] = useState(null);
    const [flashState, setFlashState] = useState(null);
    const [cardsResponse, setCardsResponse] = useState({
        code: '',
        message: ''
    });
    const [page, setPage] = useState(1);
    const [imageLoaded, setImageLoaded] = useState({})

    const [completeList, setCompleteList] = useState([]);

    let endUrl = props.location.pathname.split('/');
    endUrl = endUrl[endUrl.length - 1];

    const handleFlash = (newFlashState) => {
        setFlashState(newFlashState);
    }

    useEffect(async () => {
        let response = ''; 

        if(endUrl === 'eden'){
            response = await getEdenCards(page,10,'FR');
        }

        if(endUrl === 'register'){
            response = await getRegisterCards(page,10,'FR');
        }

        if(endUrl === 'holybook'){
            response = await getHolyBookCards(page,10,'FR');
        }

        if(response.message[1]){
            setCompleteList([...completeList,...response.message[1]]);
        }
        setCardsResponse(response);
        
    },[page]);

    useEffect(() => {
        let newImages = {};

        if(cardsResponse.message[1] instanceof Array){
            cardsResponse.message[1].map(elmt => {
                newImages[elmt.id] = false;    
            })
            console.log(cardsResponse.message[1])
        }
        
        setImageLoaded(newImages);
    }, [cardsResponse.message[1]]);

    return loaded === true ? (
        <Main classes="subdeck page">
            <Filters containerClasses="filter__container row justify-end my-2" />
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
