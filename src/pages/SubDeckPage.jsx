import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

/* components */
import Loader  from '../components/Loader';
import { RiLoader3Line } from 'react-icons/ri';

/* layouts */
import Layout from '../layouts/Layout';

function SubDeckPage(props){

    let {id} = useParams();
    const [loaded, setLoaded] = useState(false);
    const [test, setTest] = useState(false);

    useEffect(async () => {
        setTimeout(() => {
           setTest(true) 
        }, 2000);
    })


    return loaded === true ? (
        <Layout>
            <h1 className="title">Welcome </h1>
        </Layout>
    )
    :
    (
        <Loader condition={test === true} loaderIcon={RiLoader3Line} setLoaded={setLoaded} />
    )
}

export default SubDeckPage;