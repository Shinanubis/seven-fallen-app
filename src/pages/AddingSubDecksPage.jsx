import {useState, useEffect, lazy} from 'react';

import {getEdenCards, getRegisterCards, getHolyBookCards} from '../api/CardsWareHouse';

import Layout from '../layouts/Layout';
import Loader from '../components/Loader';
import {RiLoader3Line} from 'react-icons/ri';
import Flash from '../components/Flash';
import List from '../components/List';
import Filters from '../components/Filters';
import Toolbar from '../components/Toolbar';
import {FiPlus, FiMinus} from 'react-icons/fi';
import InfiniteScroll from 'react-infinite-scroll-component';

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

    let endUrl = props.location.pathname.split('/');
    endUrl = endUrl[endUrl.length - 1];

    const toolBarList = {
        Plus: {
            id: "add",
            component : () => <FiPlus id="add-one" className="toolbar__icon"/> 
        },

        Counter: {
            id: "counter",
            component: () => <input id="counter" type="text" className="toolbar__icon" value="25" />
        },

        Minus: {
            id: "remove",
            component : () => <FiMinus id="remove-one" className="toolbar__icon"/>
        },

    }

    const handleFlash = (newFlashState) => {
        setFlashState(newFlashState);
    }

    const handleToolbarList = (e) => {
        e.preventDefault();
        
    }

    useEffect(() => {
        console.log(cardsResponse)
    }, [cardsResponse])

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

        setCardsResponse(response);
    },[]);

    return loaded === true ? (
        <Layout>
            <Filters containerClasses="filter__container row  justify-end mb-3" />
            <List classes="subdeck list__content layout layout__1">
                <InfiniteScroll 
                    dataLength={cardsResponse.message[1].length}
                    hasMore={true}
                    loader={<h4 className="title">loading...</h4>}
                    next={getEdenCards(page + 1,10,'FR')}
                    scrollableTarget="list"
                >
                    {cardsResponse.message[1].map(elmt => {
                        return (
                            <li>
                                <img src={process.env.REACT_APP_CARDS_STATIC + elmt.image_path} />
                            </li>
                        )
                    })}
                
                </InfiniteScroll>
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
