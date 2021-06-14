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
            <form className="form">
                <input className="form--input" type="text" value={deckInfos.deck_name}/>
            </form>
        </Main>
    )
}

export default ModifyDeckPage;