import React from 'react'

function Energy({classes, children, title, value}) {
    return (
        <div className="energy">
            <h6 className="energy__title">{title ? title : "title"}</h6>
            <p className="energy__average">{value ? value : 125.2}</p>
        </div>
    )
}

export default Energy
