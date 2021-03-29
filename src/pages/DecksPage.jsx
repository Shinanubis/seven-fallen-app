import React from 'react'
import DecksList from '../components/DecksList'
import DecksContext from '../contexts/DecksContext'
import {GrAddCircle} from 'react-icons/gr'
import './DecksPage.css'


const DecksPage = () => {
    return (
        <DecksContext.Provider value={DecksContext._currentValue}>
            <div className="deck__page">
                <DecksList/>
                <div className="deck__list--add"><GrAddCircle /></div>
            </div>
        </DecksContext.Provider>
    )
}

export default DecksPage
