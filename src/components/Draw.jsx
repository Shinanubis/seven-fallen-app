import React from 'react'
import {GoDiffAdded} from 'react-icons/go'
import {GrPowerReset} from 'react-icons/gr'

const Draw = (props) => {
    const {text, title,target,target_id,classes} = props
    return (
        <div id={target_id} className={classes ? classes : "dropdown__draw"}>
            <a className="dropdown__link" href={target}>{title}</a>
            <div className="dropdown__body">
            {text ? <p className="dropdown__content">{text}</p> : ''}
                <div className="dropdown__cta--box">
                    <GoDiffAdded className="dropdown__icon" />
                    <GrPowerReset className="dropdown__icon"/>
                </div>
            </div>
        </div>
    )
}

export default Draw
