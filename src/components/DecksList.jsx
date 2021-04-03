import React,{useState,useContext} from 'react'
import './DecksList.css'
import Deck from './Deck'
import DecksContext from '../contexts/DecksContext'

const DecksList = () => {
    const [decksList, dispatchList] = useContext(DecksContext)
    
    return (

            <ul className="layout mb-6">
                {
                    decksList.map((elmt) => 
                        (
                            <Deck 
                                key={elmt.id} 
                                title={elmt.title} 
                                infos={elmt.infos} 
                                EC={elmt.EC}
                                data={elmt}
                            />
                        )
                    )             
                } 
            </ul>

    )
}

export default DecksList
