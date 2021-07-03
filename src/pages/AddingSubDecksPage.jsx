import {useState, useEffect} from 'react';

import {getEdenCards} from '../api/CardsWareHouse';

import Layout from '../layouts/Layout';
import Loader from '../components/Loader';
import {RiLoader3Line} from 'react-icons/ri'

function AddingSubDecksCardsPage(props) {
    const [loaded, setLoaded] = useState(true);
    const [cardsResponse, setCardsResponse] = useState({
        code: '',
        message: ''
    });

    useEffect(async () => {
        let response = await getEdenCards(1,250,'FR');
        

    },[]);

    return loaded === true ? (
        <Layout>
            
        </Layout>
    )
    :
    <Loader condition={true} loaderIcon={RiLoader3Line} setLoaded={setLoaded} />
}

export default AddingSubDecksCardsPage;
