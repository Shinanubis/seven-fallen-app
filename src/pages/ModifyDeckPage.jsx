
import {useEffect,useState, useRef} from 'react';
import { useParams } from "react-router-dom";

/* layout parts */
import Main from '../layouts/Main';

/* components */
import Button from '../components/Button';
import Flash from '../components/Flash';

/* modules */
import regexModule from '../modules/regex';

/* api*/
import { updateOne, getOne } from'../api/Decks.jsx';
import {getEdenCards } from '../api/Eden.jsx';
import {getRegisterCards } from '../api/Register.jsx';
import {getHolyBookCards } from '../api/holyBook.jsx';

/* utilities */
import checkRegex from '../utilities/checkRegex';
import { serialize } from '../utilities/serialize';
import AddCard from '../components/AddCard';

function ModifyDeckPage(props){
    const [options, setOptions] = useState(JSON.parse(sessionStorage.getItem('kingdoms')));
    const optionsTitle = 'Kingdoms';
    const [deckInfos, setDeckInfos] = useState({});
    const [flashState, setFlashState] = useState(null);
    const [response, setResponse] = useState('');
    const [formOpen, setFormOpen] = useState(false);
    const deckName = useRef(null);
    let { id } = useParams();
    const [edenCards, setEdenCards] = useState({
        cards: []
    });
    const [registerCards, setRegisterCards] = useState({
        cards: []
    });
    const [holybookCards, setHolyBookCards] = useState({
        cards: []
    });
    /* refs */
    let formRef = useRef();

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
            return true;
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

    const handleAppearForm = (e) => {
        e.preventDefault();
        setFormOpen(!formOpen);
        setTimeout(() => {
            formRef.current.scrollTo({
                bottom: 0
            });
        }, 250)
    }

    useEffect(() => {
        if(formOpen === true){
            formRef.current.classList.add("isOpen", "mt-2");
        }else{
            formRef.current.classList.remove("isOpen", "mt-2");
        }
    }, [formOpen]);

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

    useEffect(() => {
        console.log(edenCards.cards.length === 0)
    }, [edenCards])

    useEffect(async () => {
        let res = await getOne(id);
        let eden = await getEdenCards(id);
        let register = await getRegisterCards(id);
        let holybook = await getHolyBookCards(id);

        if(res.code === 200){
            setDeckInfos(res.message);
        }else{
            setFlashState(false);
            setResponse(res);
        }
        
        if(eden.code === 200){
            setEdenCards(eden.message);
        }

        if(register.code === 200){
            setRegisterCards(register.message);
        }

        if(holybook.code === 200){
            setHolyBookCards(holybook.message);
        }

    },[]);

    return (
        <Main classes="page page__deck pt-6">
            <div className="subdeck__box mb-2">
                <div className="subdeck__heading py-2">
                    <h4 className="subdeck__type">eden</h4>
                </div>
                <div className="subdeck__body p-2">
                    {
                        edenCards.cards.length === 0 ?
                            <AddCard classes="card__thumbnail--container dashed-border row justify-center align-center"/>
                            :
                            null
                    }
                </div>
            </div>
            <div className="subdeck__box mb-2">
                <div className="subdeck__heading py-2">
                    <h4 className="subdeck__type">register</h4>
                </div>
                <div className="subdeck__body p-2">
                    {
                        registerCards.cards.length === 0 ?
                            <AddCard classes="card__thumbnail--container dashed-border row justify-center align-center"/>
                            :
                            null
                    }
                </div>
            </div>
            <div className="subdeck__box mb-2">
                <div className="subdeck__heading py-2">
                    <h4 className="subdeck__type">holybook</h4>
                </div>
                <div className="subdeck__body p-2">
                    {
                        holybookCards.cards.length === 0 ?
                            <AddCard classes="card__thumbnail--container dashed-border row justify-center align-center"/>
                            :
                            null
                    }
                </div>
            </div>
            <Button text="Infos" onClick={handleAppearForm}/>
            <form ref={formRef} className="deck form mt-2 mb-4" onChange={handleChange} onBlur={handleBlur}>
                <div className="form--section column">
                    <input id="deck_name" className="form--input mb-2" ref={deckName} type="text" placeholder="deck name" value={deckInfos.deck_name}/>
                    <div className="form__option--block row">
                        <label className="form__label mr-2" htmlFor="isVisible">Public</label>
                        <input id="isVisible" className="form__checkbox" type="checkbox" checked={deckInfos.is_visible}/>
                    </div>
                    <p className="row justify-start mb-1" >Cards number : {deckInfos.num_cards}</p>
                    <p className="row jsutify-start mb-2">Total Celestian energy : {deckInfos.total_ec}</p>
                    {options && options instanceof Array ?
                        <fieldset className="pb-2 mb-3">
                            <legend className="px-2">{optionsTitle}</legend>
                            <ul id="kingdoms__list" className="column">
                                {
                                    options.map(elmt => ( 
                                            <li key={elmt.id} className="row justify-between">
                                                <label className="form__label" htmlFor={elmt.id}>{elmt.name}</label>
                                                <input 
                                                       id={elmt.id} 
                                                       className="form__checkbox" 
                                                       type="checkbox" 
                                                       name="kingdoms"
                                                       checked ={ deckInfos.kingdom && deckInfos.kingdom.includes(elmt.id)}
                                                       value={elmt.id}
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
                    <textarea id="description" className="form__textarea mb-3" placeholder="description" value={deckInfos.description}/>
                </div>
                <Button onClick={handleClick} text="update" />
            </form>
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