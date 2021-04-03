import React from 'react'
import {AiOutlineEye,AiOutlinePlusCircle} from 'react-icons/ai'
import {Link} from 'react-router-dom'

const StarterDeck = (props) => {
    const {title, infos, EC, mode} = props;
    return (
        <li className="deck__block">
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
                    <div className="action" ><AiOutlineEye/></div>
                    <Link className="action" to="/cards"><AiOutlinePlusCircle/></Link>
                </div>
            </div>
        </li>
    )
}

export default StarterDeck
