import React, {useState, useContext} from 'react'
import DecksContext from '../contexts/DecksContext'
import './Deck.css'
import {AiFillCloseCircle} from 'react-icons/ai'
import {BsPencil} from 'react-icons/bs'
import {Link} from 'react-router-dom'

const Deck = (props) => {
    const {id, title, num_cards,total_ec} = props;

    return (
        <li key={id} className="deck__block">
            <div className="deck__inner--left">
                <h3 className="deck__title">{title}</h3>
                <p className="deck__infos">{num_cards}</p>
            </div>
            <div className="deck__inner--right">
                <div className="inner__right--text">
                    <h3 className="deck__ec--title">EC :</h3>
                    <span className="deck__ec--value">{total_ec}</span>
                </div>
                <div className="inner__right--actions">
                    <div className="action" ><AiFillCloseCircle/></div>
                    <Link className="action" to={`/deck/${title}`}><BsPencil/></Link>
                </div>
            </div>
        </li>
    )
}

export default Deck;
