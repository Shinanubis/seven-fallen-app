import React from 'react'
import Layout from '../layouts/Layout'
import InputText from '../components/InputText'
import CheckBox from '../components/CheckBox'
import NavButton from '../components/NavButton'


const AddingDeckPage = (props) => {
    return (
        <>
        <Layout>
            <form className="form">
                <div className="form--section">
                    <h4 className="form__section--title">Informations</h4>
                    <InputText classes="form--input" placeholder="Nom du deck"/>
                    <CheckBox id="visible" name="visibility" classes="form__checkbox" text="public"/>
                </div>
            </form>
            <div className="buttons__block">
                <NavButton text="Create" url="/decks/new-deck/create"/>
                <NavButton text="Import" url="/decks/new-deck/import"/>
                <NavButton text="Back" url="/decks"/>
            </div>
        </Layout>

        </>
    )
}

export default AddingDeckPage
