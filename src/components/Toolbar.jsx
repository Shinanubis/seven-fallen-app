import React from 'react'

function Toolbar(props) {
    const {classes, toolsList ,onClick} = props;
    return (
        <div className={classes ? classes : "toolbar"} onClick = {onClick}>
           {
              console.log(toolsList)
           } 
        </div>
    )
}

export default Toolbar
