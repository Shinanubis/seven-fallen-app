import React from 'react'
import './Deck.css'
import {AiFillCloseCircle} from 'react-icons/ai'
import {BsPencil} from 'react-icons/bs'
import {Link} from 'react-router-dom'

const Deck = (props) => {
    const {title, infos,EC} = props

    return (
        <div className="deck__block">
            <div className="deck__inner--left">
                <h3 className="deck__title">{title}</h3>
                <p className="deck__infos">{infos}</p>
            </div>
            <div className="deck__inner--right">
                <div className="inner__right--text">
                    <h3 className="deck__ec--title">EC :</h3>
                    <span className="deck__ec--value">{EC}</span>
                </div>
                <div className="inner__right--actions">
                    <div className="action__delete"><AiFillCloseCircle/></div>
                    <Link className="action__modify" to={`/deck/${title}`}><BsPencil/></Link>
                </div>
            </div>
        </div>
    )
}

export default Deck
