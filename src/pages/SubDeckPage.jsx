import {useEffect, useState} from 'react';
import { useParams, Link } from 'react-router-dom';

/* api */
import { getEdenCards } from '../api/Eden';
import { getRegisterCards } from '../api/Register';
import { getHolyBookCards } from '../api/HolyBook';

/* components */
import Loader  from '../components/Loader';
import { RiLoader3Line } from 'react-icons/ri';
import List from '../components/List';

/* layouts */
import Main from '../layouts/Main';

function SubDeckPage(props){

    let {id} = useParams();
    const [loaded, setLoaded] = useState(false);

    let endUrl = props.location.pathname.split('/');
    endUrl = endUrl[endUrl.length - 1];

    const [cardsList, setCardsList] = useState({
        code: null,
        message: null
    });
    const [isEmpty, setIsEmpty] = useState(true);
    const [test, setTest] = useState(false);

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
            <List classes="list__content layout layout__3">
                {
                    isEmpty === true ?
                    (<>
                        <p style ={{color: "black",margin:"0 auto",textAlign:"center"}}>
                            Empty 
                        </p>
                        <Link to={`/decks/${id}/subdecks`}>Retour</Link>
                        </>
                    )
                    :
                    (
                        <p style ={{color: "black",marginTop:"auto",marginBottom:"auto", textAlign: "center"}}>
                            I'm full
                        </p>
                    )
                }
            </List>
        </Main>
    )
    :
    (
        <Loader condition={test === true} loaderIcon={RiLoader3Line} setLoaded={setLoaded} />
    )
}

export default SubDeckPage;