import React from 'react'
import CheckBox from './CheckBox'


const Card = (props) => {
    const {id,url,alt,mode,onChange} = props

    return (
        <li className="card__container" onChange={onChange}>
            <img className="card__image" src={url} alt={alt}/>
            {mode === 'edit' ? <CheckBox id={id} classes="card__checkbox"/> : ''} 
        </li>
    )
}

export default Card
