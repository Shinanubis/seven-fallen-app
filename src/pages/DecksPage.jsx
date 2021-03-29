import React from 'react'
import DecksList from '../components/DecksList'
import DecksContext from '../contexts/DecksContext'


const DecksPage = () => {
    return (
        <DecksContext.Provider value={DecksContext._currentValue}>
            <DecksList/>
        </DecksContext.Provider>
    )
}

export default DecksPage
