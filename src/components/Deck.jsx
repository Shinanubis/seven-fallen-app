import React from 'react'
import './Deck.css'

const Deck = (props) => {
    const {title, infos} = props
    return (
        <div className="deck__block">
            <h3 className="deck__title">{title}</h3>
            <p className="deck__infos">{infos}</p>
        </div>
    )
}

export default Deck
