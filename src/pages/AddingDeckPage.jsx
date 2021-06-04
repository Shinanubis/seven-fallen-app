import React, {useState, useEffect} from 'react';
import {createUserDeck} from '../api/Decks';
import Layout from '../layouts/Layout';
import InputText from '../components/InputText';
import CheckBox from '../components/CheckBox';
import NavButton from '../components/NavButton';
import Flash from '../components/Flash';
import { RiContactsBookLine } from 'react-icons/ri';


const AddingDeckPage = (props) => {

    const [fieldValues, setFieldValues] = useState({
        deck_name: '',
        visibility: true
    });

    const [inputState, setInputState] = useState(true);
    const [createState, setCreateState] = useState({});
    const [flash, setFlash] = useState(null);

    const handleBlur = (e) => {
        setFieldValues({...fieldValues, deck_name: e.target.value});
        if(e.target.value.length > 0){
            setInputState(false)
        }else{
            setInputState(true);
        };
    }

    const handleCheck = (e) => {
        setFieldValues({...fieldValues, visibility: e.target.checked});
    }

    const handleInputChange = (e) => {
        setFieldValues({...fieldValues, deck_name: e.target.value});
        if(e.target.value.length > 0){
                setInputState(false)
            }else{
                setInputState(true);
            };
    }

    const handleCreate = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('deck_name', fieldValues.deck_name);
        form.append('visibility', fieldValues.visibility);
        let response = await createUserDeck(form);
        if(response.code === 200){
            setFlash(true);
            setCreateState(response);
            return true;
        }else{
            setFlash(false);
            setCreateState(response);
            return false;
        }  
    }

    return (
        <>
            <Layout>
                <form className="form">
                    <div className="form--section">
                        <h4 className="form__section--title">Informations</h4>
                        <InputText classes={inputState === true ? "form--input bad__input" : 'form--input good__input'} placeholder="Nom du deck" onChange={handleInputChange} onBlur={handleBlur} value={fieldValues.deck_name}/>
                        <CheckBox id="visible" name="visibility" classes="form__checkbox" text="public" onChange={handleCheck} checked={fieldValues.visibility}/>
                        
                        {flash === true ? <Flash classes="message__flash message__flash-done" modifier="message__flash-done" message={createState.deck_name} /> : ''}
                        {flash === false ? <Flash classes="message__flash message__flash-error" modifier="message__flash-error" message={createState.deck_name}/> : ''}
                        {flash === null ? <Flash classes="message__flash" message={createState.message}/> : ''}

                    </div>
                </form>
                <div className="buttons__block">
                    <NavButton text="Create" url="/decks/new-deck/create" onClick={handleCreate} />
                    <NavButton text="Import" url="/decks/new-deck/import"/>
                    <NavButton text="Back" url="/decks"/>
                </div>
            </Layout>
        </>
    )
}

export default AddingDeckPage
