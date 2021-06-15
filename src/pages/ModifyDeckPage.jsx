import Main from '../layouts/Main';
import {useEffect,useState} from 'react';
import {getOne} from '../api/Decks';

function ModifyDeckPage(props){
    const [deckInfos, setDeckInfos] = useState({});

    useEffect(async () => {
        let res = await getOne(props.location.deckProps.id);
        console.log(res);
        setDeckInfos(res.message);
    },[]);

    return (
        <Main classes="page page__deck">
            <form className="form">
                <div className="form--section column">
                    <input className="form--input mb-3" type="text" placeholder="deck name" value={deckInfos.deck_name}/>
                    <div className="form__option--block row mb-3">
                        <label className="form__label mr-1">Public</label>
                        <input className="form__checkbox" type="checkbox" />
                    </div>
                    <textarea id="description" className="form__textarea" placeholder="description" value={deckInfos.description}/>
                </div>
            </form>
        </Main>
    )
}

export default ModifyDeckPage;