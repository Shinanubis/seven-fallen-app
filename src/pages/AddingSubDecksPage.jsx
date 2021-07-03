import {useState, useEffect} from 'react';

import {getEdenCards} from '../api/CardsWareHouse';

import Layout from '../layouts/Layout';
import Loader from '../components/Loader';
import {RiLoader3Line} from 'react-icons/ri'

function AddingSubDecksCardsPage(props) {
    const [loaded, setLoaded] = useState(false);
    const [cardsResponse, setCardsResponse] = useState({
        code: '',
        message: ''
    });

    useEffect(() => {
        console.log(cardsResponse)
    },[cardsResponse]);

    useEffect(async () => {
        let response = await getEdenCards(1,250,'FR');
        setCardsResponse(response)
    },[]);

    return loaded === true ? (
        <Layout>
            
        </Layout>
    )
    :
    <Loader condition={cardsResponse.code === 200} loaderIcon={RiLoader3Line} setLoaded={setLoaded} />
}

export default AddingSubDecksCardsPage;
