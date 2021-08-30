import React from 'react'

function Name({classes, name}) {
    return (
        <p className={classes ? classes : "deck__name"}>
            {name}
        </p>
    )
}

export default Name
