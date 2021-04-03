import React from 'react'
import './User.css'
import UserDefault from './UserDefault'

const User = (props) => {
    const {content} = props;
    return (
        <li key={content.id} className="user__block">
            <div className="user__heading">
                {content.img ? <img src={content.img} alt="user avatar"/> : <UserDefault classes="user__default--icon"/>}
                {content.title ? <h4>{content.title}</h4> : ''}
            </div>
            <div className="user__body">
                {content.id ? <p>ID : {content.id}</p> : ''}
                {content.location ? <p>{content.location}</p> : ''}
                {content.deck_num ? <p>Decks : {content.deck_num}</p> : ''}
            </div>
        </li>
    )
}

export default User
