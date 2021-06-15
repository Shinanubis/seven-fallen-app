import Main from '../layouts/Main';
import {useEffect,useState} from 'react';
import {getOne} from '../api/Decks';

function ModifyDeckPage(props){
    const {options, optionsName} = props.location;
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
                    <input className="form--input mb-2" type="text" placeholder="deck name" value={deckInfos.deck_name}/>
                    {options && options instanceof Array ?
                        <fieldset className="pb-2 mb-2">
                            <legend className="pb-1">{optionsName}</legend>
                            <ul className="column">
                                {
                                    options.map(elmt => ( 
                                            <li className="row justify-between">
                                                <label className="form__label" htmlFor={elmt[0]}>{elmt[1]}</label>
                                                <input id={elmt[0]} className="form__checkbox" type="checkbox" value={elmt[0]}/>
                                            </li> 
                                        )
                                    )
                                }
                            </ul>
                        </fieldset>
                        :
                        null
                    }
                    <div className="form__option--block row mb-2">
                        <label className="form__label mr-2">Public</label>
                        <input className="form__checkbox" type="checkbox" />
                    </div>
                    <textarea id="description" className="form__textarea" placeholder="description" value={deckInfos.description}/>
                </div>
            </form>
        </Main>
    )
}

export default ModifyDeckPage;