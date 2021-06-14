import Main from '../layouts/Main';
import {useEffect,useState} from 'react';
import {getOne} from '../api/Decks';

function ModifyDeckPage(props){
    const [deckInfos, setDeckInfos] = useState({});

    useEffect(async () => {
        let res = await getOne(props.location.deckProps.id);
        setDeckInfos(res.message);
    },[]);

    return (
        <Main classes="page__deck column justify-center align-center">
            <h2 className="deck__name">{deckInfos.deck_name}</h2>

        </Main>
    )
}

export default ModifyDeckPage;