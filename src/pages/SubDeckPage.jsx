import {useEffect, useState, useRef} from 'react';
import { useParams, Link } from 'react-router-dom';

/* api */
import { getEdenCards } from '../api/Eden';
import { getRegisterCards } from '../api/Register';
import { getHolyBookCards } from '../api/HolyBook';

/* components */
import Loader  from '../components/Loader';
import { RiLoader3Line } from 'react-icons/ri';
import { AiFillCloseCircle } from 'react-icons/ai';
import Button from '../components/Button';
import PopupContainer from '../components/PopupContainer';

/* layouts */
import Main from '../layouts/Main';

function SubDeckPage(props){

    let endUrl = props.location.pathname.split('/');
    endUrl = endUrl[endUrl.length - 1];

    let {id} = useParams();
    const [loaded, setLoaded] = useState(false);
    const [cardsList, setCardsList] = useState({
        code: null,
        message: null
    });
    const [isEmpty, setIsEmpty] = useState(true);
    const [test, setTest] = useState(false);

    const popupRef = useRef(null);

    const handleClick = (e) => {
        e.preventDefault();

        if(popupRef.current.classList.contains('d-none')){
            popupRef.current.classList.remove('d-none');
        }else{
            popupRef.current.classList.add('d-none');      
        }

        return true;
    }

    useEffect(() => {
        setTimeout(() => {
           setTest(true); 
        }, 500);
    })

    useEffect(async () => {

    }, [setCardsList]);

    useEffect(async () => {
        let response = null;

        if(endUrl === 'eden'){
            response = await getEdenCards(id);
        }
        
        if(endUrl === 'register'){
            response = await getRegisterCards(id);
        }

        if(endUrl === 'holybook'){
            response = await getHolyBookCards(id);
        }

        if(response.message[0].cards.length === 0){
            setIsEmpty(true);
        }else{
            setIsEmpty(false);
        }
        setCardsList(response);
    },[]);


    return loaded === true ? (
        <Main classes="page">
                {
                    isEmpty === true ?
                    (
                        <>   
                            <div className="empty__container column justify-center">
                                <Button text={`add cards to ${endUrl}`} onClick={handleClick}/>
                            </div>
                            <PopupContainer classes="row justify-center popup__container py-5 d-none" ref={popupRef}>
                                <div className="popup__heading">
                                    <div className="popup__close" onClick={handleClick}>
                                        <AiFillCloseCircle />
                                    </div>
                                </div>
                                <div className="popup__body">

                                </div>
                                <Button text="Valid" />
                            </PopupContainer>
                        </>
                    )
                    :
                    (
                        <p style ={{color: "black",marginTop:"auto",marginBottom:"auto", textAlign: "center"}}>
                            I'm full
                        </p>
                    )
                }
            <Link to={`/decks/${id}/subdecks`}>Back</Link>
        </Main>
    )
    :
    (
        <Loader condition={test === true} loaderIcon={RiLoader3Line} setLoaded={setLoaded} />
    )
}

export default SubDeckPage;