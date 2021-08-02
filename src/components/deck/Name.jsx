import React from 'react'

function Name({classes, children, name}) {
    return (
        <p className={classes ? classes : children}>
            {name}
        </p>
    )
}

export default Name
