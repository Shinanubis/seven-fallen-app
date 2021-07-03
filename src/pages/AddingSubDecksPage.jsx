import {useState, useEffect} from 'react';

import {getEdenCards} from '../api/CardsWareHouse';

import Layout from '../layouts/Layout';
import Loader from '../components/Loader';
import {RiLoader3Line} from 'react-icons/ri';
import Flash from '../components/Flash';
import List from '../components/List';

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

    const handleFlash = (newFlashState) => {
        setFlashState(newFlashState);
    }

    useEffect(() => {
        console.log(cardsResponse)
    },[cardsResponse]);

    useEffect(async () => {
        let response = await getEdenCards(1,20,'FR');
        setCardsResponse(response);
    },[]);

    return loaded === true ? (
        <Layout>
            <List classes="list__content layout layout__3">
                {
                    cardsResponse.message[1].map(elmt => {
                        return (
                            <li className="card__container">
                                <img 
                                    className="card__image" 
                                    src={process.env.REACT_APP_CARDS_STATIC + '/' + elmt.image_path } 
                                    alt="card"
                                    loading="lazy"
                                />
                            </li>
                        )
                    })
                }
            </List>
            <Flash 
                classes="message__flash" 
                errorClass="message__flash-error" 
                successClass="message__flash-done" 
                message={flashMessage ? flashMessage : "flash message"}
                timing={750}
                flash={flashState}
                handleFlash= {handleFlash}
            />
        </Layout>
    )
    :
    <Loader condition={cardsResponse.code === 200} loaderIcon={RiLoader3Line} setLoaded={setLoaded} />
}

export default AddingSubDecksCardsPage;
