import {useState, useEffect, lazy} from 'react';

import {getEdenCards} from '../api/CardsWareHouse';

import Layout from '../layouts/Layout';
import Loader from '../components/Loader';
import {RiLoader3Line} from 'react-icons/ri';
import Flash from '../components/Flash';
import List from '../components/List';
import Filters from '../components/Filters';
import Toolbar from '../components/Toolbar';
import {FiPlus, FiMinus} from 'react-icons/fi';

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

    const toolBarList = {
        Plus: {
            id : "add",
            component : <FiPlus className="toolbar__plus"/> 
        },
        Minus: {
            id: "remove",
            component : <FiMinus className="toolbar__minus"/>
        }
    }

    const handleFlash = (newFlashState) => {
        setFlashState(newFlashState);
    }

    const handleToolbarList = (e) => {
        e.preventDefault();
        console.log(e.target.id)
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
            <Filters containerClasses="filter__container row  justify-end w-80 mb-3" />
            <List classes="subdeck list__content layout layout__1">
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
                                <Toolbar 
                                    classes="toolbar column" 
                                    toolsList={toolBarList} 
                                    onClick={handleToolbarList} 
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
