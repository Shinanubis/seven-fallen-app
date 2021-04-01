import React from 'react'
import Button from '../components/Button'
import {useHistory} from 'react-router-dom'

const ChoicePage = (props) => {
    const {links, text, backlink, backtext} = props;
    const history = useHistory();

    const handleClick = (e,url) => {
        e.preventDefault();
        history.goBack(url)
    }

    return (
        <div className="page">
            <div className="block">
                <Button classes="btn" text="Starter Deck"/>
                <Button classes="btn" text="Individual Card"/>
            </div>
            <Button classes="btn" text={backtext} onClick={(e) => handleClick(e,backlink)}/>
        </div>
    )
}

export default ChoicePage
