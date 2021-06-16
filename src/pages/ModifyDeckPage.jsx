import Main from '../layouts/Main';
import {useEffect,useState, useRef} from 'react';
import {getOne} from '../api/Decks';
import Button from '../components/Button';
import regexModule from '../modules/regex';
import checkRegex from '../utilities/checkRegex';

function ModifyDeckPage(props){
    const {options, optionsName} = props.location;
    const [deckInfos, setDeckInfos] = useState({});
    const deckName = useRef(null);

    /* handling functions */

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

    }

    const handleClick = async (e) => {
        e.preventDefault();

    }

    useEffect(() => {
        
        if(checkRegex(regexModule.regex_deck_name, deckName.current.value) === true){
            deckName.current.classList.add('good__input');
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
        let res = await getOne(props.location.deckProps.id);
        setDeckInfos(res.message);
    },[]);

    return (
        <Main classes="page page__deck">
            <form className="form" onChange={handleChange}>
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
        </Main>
    )
}

export default ModifyDeckPage;