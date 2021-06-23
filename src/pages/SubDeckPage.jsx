import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

/* api */
import { getEdenCards } from '../api/Eden';

/* components */
import Loader  from '../components/Loader';
import { RiLoader3Line } from 'react-icons/ri';

/* layouts */
import Main from '../layouts/Main';

function SubDeckPage(props){

    let {id} = useParams();
    const [loaded, setLoaded] = useState(false);

    const [cardsList, setCardsList] = useState({
        code: null,
        message: null
    });
    const [test, setTest] = useState(false);

    useEffect(() => {
        setTimeout(() => {
           setTest(true) 
        }, 750);
    })

    useEffect(async () => {
        let response = await getEdenCards(id);
        console.log(response)
    },[]);


    return loaded === true ? (
        <Main>
            <h1 className="title">Welcome</h1>
        </Main>
    )
    :
    (
        <Loader condition={test === true} loaderIcon={RiLoader3Line} setLoaded={setLoaded} />
    )
}

export default SubDeckPage;