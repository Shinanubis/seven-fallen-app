import React from 'react'
import './User.css'

const User = (props) => {
    const {content} = props;
    return (
        <div className="user__block">
            <div className="user__heading">
                {content.img ? <img src={content.img} /> : ''}
                {content.title ? <h4>{content.title}</h4> : ''}
            </div>
            <div className="user__body">
                {content.id ? <p>{content.id}</p> : ''}
                {content.location ? <p>{content.location}</p> : ''}
                {content.num_deck ? <p>{content.num_deck}</p> : ''}
            </div>
        </div>
    )
}

export default User
