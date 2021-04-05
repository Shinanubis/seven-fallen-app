import React from 'react'
import Draw from './Draw'

const Dropdown = (props) => {
    const {classes, datas} = props
    return (
        <div className={classes ? classes : "dropdown__menu"}>
           {datas.map(elmt => (
                <Draw key={elmt.id} classes="dropdown__draw" text={elmt.content} title={elmt.title} target_id={elmt.target_id} target={elmt.target}/>   
            ))}
        </div>
    )
}

export default Dropdown
