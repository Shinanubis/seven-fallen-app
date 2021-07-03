import React from 'react'

function Toolbar(props) {
    const {classes, toolsList ,onClick} = props;
    return (
        <div className={classes ? classes : "toolbar"} onClick = {onClick}>
           {
             toolsList ? 
                console.log(toolsList)
            :
            null
           } 
        </div>
    )
}

export default Toolbar
