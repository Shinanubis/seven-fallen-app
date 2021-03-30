import React,{useReducer} from 'react'
import DecksList from '../components/DecksList'
import {GrAddCircle} from 'react-icons/gr'
import './DecksPage.css'



const DecksPage = () => {

    return (
            <div className="deck__page">
                <DecksList/>
                <div className="deck__list--add"><GrAddCircle /></div>
            </div>

    )
}

export default DecksPage
