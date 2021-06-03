import React, {useState, useEffect} from 'react';
import {createUserDeck} from '../api/Decks';
import Layout from '../layouts/Layout';
import InputText from '../components/InputText';
import CheckBox from '../components/CheckBox';
import NavButton from '../components/NavButton';
import { RiContactsBookLine } from 'react-icons/ri';


const AddingDeckPage = (props) => {

    const form = new FormData();

    const [fieldValues, setFieldValues] = useState({
        deck_name: '',
        visibility: true
    });

    const handleBlur = (e) => {
        console.log(e.target.value);
    }

    const handleCheck = (e) => {

    }

    const handleCreate = (e) => {
        console.log("Create a deck")
    }

    return (
        <>
        <Layout>
            <form className="form">
                <div className="form--section">
                    <h4 className="form__section--title">Informations</h4>
                    <InputText classes="form--input" placeholder="Nom du deck" onBlur={handleBlur} value={fieldValues.deck_name}/>
                    <CheckBox id="visible" name="visibility" classes="form__checkbox" text="public"/>
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
