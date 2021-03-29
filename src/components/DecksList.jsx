import React, {useContext} from 'react'
import DecksContext from '../contexts/DecksContext'
import Deck from './Deck'

const DecksList = () => {
    const data = useContext(DecksContext)
    return (
        <>
            {
                data.map((elmt,index) => 
                    (<Deck key={index} title={elmt.title} infos={elmt.infos}/>)
                )}
        </>
    )
}

export default DecksList
