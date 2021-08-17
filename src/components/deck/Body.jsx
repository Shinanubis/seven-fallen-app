import React from 'react'

function Body({classes, children, backgroundBodyColor}) {
    return (
        <div className={classes ? classes : "deck__body"} style={{backgroundColor: backgroundBodyColor}}>
            {children}
        </div>  
    )
}

export default Body;
