import React from 'react'

function Body({classes, children}) {
    return (
        <div className={classes ? classes : "deck__body"}>
            {children}
        </div>  
    )
}

export default Body;
