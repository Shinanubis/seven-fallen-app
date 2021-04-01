import React from 'react'
import Button from '../components/Button'
import Separator from '../components/Separator'

const ChoicePage = () => {
    return (
        <div className="page">
            <div className="block">
                <Button classes="btn" text="Starter Deck"/>
                <Separator/>
                <Button classes="btn" text="Individual Card"/>
            </div>
            <Button classes="btn" text="Cancel"/>
        </div>
    )
}

export default ChoicePage
