import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

/* components */
import Loader  from '../components/Loader';
import { RiLoader3Line } from 'react-icons/ri';

/* layouts */
import Main from '../layouts/Main';

function SubDeckPage(props){

    let {id} = useParams();
    const [loaded, setLoaded] = useState(false);
    const [test, setTest] = useState(false);

    useEffect(() => {
        setTimeout(() => {
           setTest(true) 
        }, 750);
    })


    return loaded === true ? (
        <Main>
            <h1 className="title">Welcome </h1>
        </Main>
    )
    :
    (
        <Loader condition={test === true} loaderIcon={RiLoader3Line} setLoaded={setLoaded} />
    )
}

export default SubDeckPage;