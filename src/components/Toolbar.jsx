import React from 'react'

function Toolbar(props) {
    const {classes, toolsList ,onClick} = props;
    return (
        <div className={classes ? classes : "toolbar"} onClick = {onClick}>
           {
             toolsList ? 
                Object.keys(toolsList).map((elmt, index) => {
                    let NewComponent = toolsList[elmt].component;
                    return (<NewComponent key={index} id={toolsList[elmt].id} classes="toolbar__icon"/>)
                })
            :
            null
           } 
        </div>
    )
}

export default Toolbar
