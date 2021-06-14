import Main from '../layouts/Main';
import {useEffect,useState} from 'react';
import {getOne} from '../api/Decks';

function ModifyDeckPage(props){
    const [deckInfos, setDeckInfos] = useState({});

    useEffect(async () => {
        let res = await getOne(props.location.deckProps.id);
        console.log(res);
    },[]);

    return (
        <Main classes="page__deck column justify-center align-center">
            <p>{props.location.deckProps.id}</p>
        </Main>
    )
}

export default ModifyDeckPage;