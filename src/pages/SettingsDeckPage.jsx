import React from 'react'
import {useParams} from 'react-router-dom'
import './SettingsDeckPage.css'
const SettingsDeckPage = () => {
    const deckName = useParams();
    console.log(deckName)
    return (
        <div>
            <h1 className="deck__setting--title">{deckName.name} settings page</h1>
        </div>
    )
}

export default SettingsDeckPage
