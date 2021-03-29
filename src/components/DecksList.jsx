import React, {useContext} from 'react'
import './DecksList.css'
import DecksContext from '../contexts/DecksContext'
import Deck from './Deck'

const DecksList = () => {
    const data = useContext(DecksContext)
    return (
        <div className="deck__list">
            {
                data.map((elmt,index) => 
                    (<Deck key={index} title={elmt.title} infos={elmt.infos}/>)
                )
                
            }
        <div className="deck__list-layer"></div> 
        </div>
    )
}

export default DecksList
