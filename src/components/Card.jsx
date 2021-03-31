import React from 'react'
import './Card.css'

const Card = (props) => {
    const {id,url,alt} = props
    return (
        <div key={id} className="card__container">
            {<img className="card__image" src={url} alt={alt}/>}
        </div>
    )
}

export default Card
