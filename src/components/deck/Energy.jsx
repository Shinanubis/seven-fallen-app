import React from 'react'

function Energy({classes, title, ec}) {
    return (
        <div className={classes ? classes : "deck__energy"}>
            <h6 className="energy__title">{title ? title : "title"}</h6>
            <p className="energy__average">{ec ? ec : 0.0}</p>
        </div>
    )
}

export default Energy
