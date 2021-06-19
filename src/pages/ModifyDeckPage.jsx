
import {useEffect,useState, useRef} from 'react';
import { useParams, Redirect } from "react-router-dom";

/* layout parts */
import Main from '../layouts/Main';

/* components */
import Button from '../components/Button';
import Flash from '../components/Flash';

/* modules */
import regexModule from '../modules/regex';

/* api*/
import { updateOne,getOne } from'../api/Decks.jsx';

/* utilities */
import checkRegex from '../utilities/checkRegex';
import { serialize } from '../utilities/serialize';

function ModifyDeckPage(props){

    const {options, optionsName} = props.location;
    const [deckInfos, setDeckInfos] = useState({});
    const [flashState, setFlashState] = useState(null);
    const [response, setResponse] = useState('');
    const deckName = useRef(null);
    let { id } = useParams();

    /* handling functions */

    const handleFlash = (newFlashState) => {
        setFlashState(newFlashState);
    };

    const handleChange = (e) => {
        if(e.target.name === 'kingdoms'){
            if(e.target.checked === true){
                setDeckInfos(prevState => {
                    let newArr = prevState.kingdom === null ? [Number(e.target.id)] : [...prevState.kingdom, Number(e.target.id)];
                    const newSet = new Set(newArr);
                    newArr = Array.from(newSet);
                    return {
                        ...prevState,
                        kingdom: newArr.sort()
                    };
                });
            }
            
            if(e.target.checked === false){
                setDeckInfos(prevState => {
                    let newArr = [...prevState.kingdom];
                    const index = newArr.indexOf(Number(e.target.value));
                    if(index > -1){
                        newArr.splice(index, 1);
                    }

                    return {
                        ...prevState,
                        kingdom: newArr.sort()
                    }

                })
            }
        }
        
        if(e.target.id === 'deck_name'){
            setDeckInfos({...deckInfos, deck_name: e.target.value})
        }

        if(e.target.id === 'description'){
            setDeckInfos({...deckInfos, description: e.target.value});
        }

        if(e.target.id === 'isVisible'){
            setDeckInfos({...deckInfos, is_visible: e.target.checked});
        }
    }

    const handleBlur = (e) => {
        if(e.target.id === 'deck_name'){
            setDeckInfos({...deckInfos, deck_name: e.target.value});
        }
    }   

    const handleClick = async (e) => {
        e.preventDefault();
        let form = new FormData();
        Object.keys(deckInfos).map(elmt => {
            if(elmt === 'kingdom'){
                form.append(elmt, serialize(deckInfos.kingdom));
            }else{
                form.append(elmt, deckInfos[elmt]);
            }
        });

        let updateRes = await updateOne(form, id);
            setResponse(updateRes);
        if(updateRes.code === 200){
            setFlashState(true);
        }else if(updateRes.code !== 200){
            setFlashState(false);
        }else{
            setFlashState(null)
        }
    }

    useEffect(() => {
        
        if(checkRegex(regexModule.regex_deck_name, deckName.current.value) === true){
            deckName.current.classList.add('good__input');
        }

        if(checkRegex(regexModule.regex_deck_name, deckName.current.value) === false){
            deckName.current.classList.add('bad__input');
        }

        return () => {
            if(deckName.current.classList.contains('good__input')){
                deckName.current.classList.remove('good__input');
            };

            if(deckName.current.classList.contains('bad__input')){
                deckName.current.classList.remove('bad__input');
            };
        }
    }, [deckInfos.deck_name]);

    useEffect(async () => {
        let res = await getOne(id);
        if(res.code === 200 && res.message){
            setDeckInfos(res.message);
        }else{
            setFlashState(false);
            setResponse(res);
        }
    },[]);

    return (
        <Main classes="page page__deck">
            {deckInfos ?
            <form className="form" onChange={handleChange} onBlur={handleBlur}>
                <div className="form--section column">
                    <input id="deck_name" className="form--input mb-2" ref={deckName} type="text" placeholder="deck name" value={deckInfos.deck_name}/>
                    <p className="row justify-start mb-1" >Cards number : {deckInfos.num_cards}</p>
                    <p className="row jsutify-start mb-2">Total Celestian energy : {deckInfos.total_ec}</p>
                    {options && options instanceof Array ?
                        <fieldset className="pb-2 mb-2">
                            <legend className="px-2">{optionsName}</legend>
                            <ul id="kingdoms__list" className="column">
                                {
                                    options.map(elmt => ( 
                                            <li key={elmt[0]} className="row justify-between">
                                                <label className="form__label" htmlFor={elmt[0]}>{elmt[1]}</label>
                                                <input 
                                                       id={elmt[0]} 
                                                       className="form__checkbox" 
                                                       type="checkbox" 
                                                       name="kingdoms"
                                                       checked ={ deckInfos.kingdom && deckInfos.kingdom.includes(elmt[0])}
                                                       value={elmt[0]}
                                                />
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
                        <label className="form__label mr-2" htmlFor="isVisible">Public</label>
                        <input id="isVisible" className="form__checkbox" type="checkbox" checked={deckInfos.is_visible}/>
                    </div>
                    <textarea id="description" className="form__textarea" placeholder="description" value={deckInfos.description}/>
                </div>
                <Button onClick={handleClick} text="update" />
            </form>
            :
            <Redirect to="/not-found" />
            }
            <Flash 
                    classes="message__flash" 
                    errorClass="message__flash-error" 
                    successClass="message__flash-done" 
                    message={response.message ? response.message : "flash message"}
                    timing={750}
                    flash={flashState}
                    handleFlash={handleFlash}
                />
        </Main>
    )
}

export default ModifyDeckPage;