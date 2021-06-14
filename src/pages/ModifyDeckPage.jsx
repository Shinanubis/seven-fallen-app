import Main from '../layouts/Main';
import {useEffect,useState} from 'react';
import {getOne} from '../api/Decks';

function ModifyDeckPage(props){
    const [deckInfos, setDeckInfos] = useState({});

    useEffect(async () => {
        let res = await getOne(props.location.deckProps.id);
        setDeckInfos(res.message);
        console.log(res)
    },[]);

    return (
        <Main classes="page page__deck">
            <form className="form">
                <div className="form--section column">
                    <input className="form--input" type="text" placeholder="deck name" value={deckInfos.deck_name}/>
                    <label className="form__label--textarea row mb-1" htmlFor="description">Description :</label>
                    <textarea className="form__textarea" id="description" value={deckInfos.description}/>
                </div>
            </form>
        </Main>
    )
}

export default ModifyDeckPage;