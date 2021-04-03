import React from 'react'
import './Card.css'
import CheckBox from './CheckBox'

const Card = (props) => {
    const {id,url,alt,mode} = props
    console.log(mode)
    return (
        <li key={id} className="card__container">
            <img className="card__image" src={url} alt={alt}/>
            {mode === 'edit' ? <CheckBox classes="card__checkbox"/> : ''} 
        </li>
    )
}

export default Card
