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
        e.preventDefault();
        setFieldValues({...fieldValues, deck_name: e.target.value});
    }

    const handleCheck = (e) => {
        e.preventDefault();
    }

    const handleCreate = async (e) => {
        e.preventDefault();
        let response = await createUserDeck();
    }

    useEffect(() => {
        console.log(fieldValues)
    });

    return (
        <>
        <Layout>
            <form className="form">
                <div className="form--section">
                    <h4 className="form__section--title">Informations</h4>
                    <InputText classes="form--input" placeholder="Nom du deck" onBlur={handleBlur} />
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
