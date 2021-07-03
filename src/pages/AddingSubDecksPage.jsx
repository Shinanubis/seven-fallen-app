import {useState, useEffect} from 'react';

import {getEdenCards} from '../api/CardsWareHouse';

import Layout from '../layouts/Layout';
import Loader from '../components/Loader';
import {RiLoader3Line} from 'react-icons/ri';
import Flash from '../components/Flash';
import List from '../components/List';

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
            <List classes="layout layout__3">

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
