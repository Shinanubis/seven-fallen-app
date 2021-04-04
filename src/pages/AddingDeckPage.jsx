import React from 'react'
import Layout from '../layouts/Layout'
import InputText from '../components/InputText'
import CheckBox from '../components/CheckBox'
import NavButton from '../components/NavButton'


const AddingDeckPage = (props) => {
    return (
        <>
        <Layout>
            <h1>{props.location.pathname.split('/').pop().split('-').join(' ')}</h1>
            <form className="form">
                <div className="form--section">
                    <h4 className="form__section--title">Informations</h4>
                    <InputText classes="form--input" placeholder="Nom du deck"/>
                    <CheckBox id="visible" name="visibility" classes="form__checkbox" text="public"/>
                </div>
            </form>
            <NavButton text="Next" url="/decks/new-deck/build"/>
            <NavButton text="Back" url="/decks"/>
        </Layout>

        </>
    )
}

export default AddingDeckPage
