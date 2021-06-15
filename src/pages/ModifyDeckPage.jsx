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
        <Main classes="page page__deck">
            <form className="form">
                <div className="form--section column">
                    <input className="form--input mb3" type="text" placeholder="deck name" value={deckInfos.deck_name}/>
                    <textarea id="description" className="form__textarea" placeholder="description" value={deckInfos.description}/>
                </div>
            </form>
        </Main>
    )
}

export default ModifyDeckPage;