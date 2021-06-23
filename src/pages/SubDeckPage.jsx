import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

/* api */
import { getEdenCards } from '../api/Eden';

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
    endUrl = endUrl[endUrl.length -1];

    const [cardsList, setCardsList] = useState({
        code: null,
        message: null
    });
    const [isEmpty, setIsEmpty] = useState(null);
    const [test, setTest] = useState(false);

    useEffect(() => {
        setTimeout(() => {
           setTest(true) 
        }, 750);
    })

    useEffect(async () => {
        let response = null; 
        response = await getEdenCards(id);
        if(response === 200){
            console.log(response.message[0].cards.length === 0)
            if(response.message[0].cards.length === 0){
                setIsEmpty(true);
            }else{
                setIsEmpty(false);
            }
        }
    },[]);


    return loaded === true ? (
        <Main>
            {
                isEmpty === true ?
                    (<p style ={{color: "black",marginTop:"auto",marginBottom:"auto"}}>
                        Empty 
                    </p>)
                :
                (<List>

                </List>) 
            }
        </Main>
    )
    :
    (
        <Loader condition={test === true} loaderIcon={RiLoader3Line} setLoaded={setLoaded} />
    )
}

export default SubDeckPage;