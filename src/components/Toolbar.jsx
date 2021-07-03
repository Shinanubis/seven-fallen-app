import React from 'react'

function Toolbar(props) {
    const {classes, toolsList ,onClick} = props;
    return (
        <div className={classes ? classes : "toolbar"} onClick = {onClick}>
           {
             toolsList ? 
                Object.keys(toolsList).map(elmt => {
                    let NewComponent = toolsList[elmt].component;
                    console.log(NewComponent)
                })
            :
            null
           } 
        </div>
    )
}

export default Toolbar
