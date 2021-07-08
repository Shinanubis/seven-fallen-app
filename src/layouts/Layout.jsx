import React from 'react'
import Header from './Header'
import Main from './Main'

const layout = (props) => {
        const {classes} = props; 
        return (
        <>
           <Main className={classes ? classes : "page"}>
               {props.children instanceof Array ? props.children.map((elmt, index) => {
                   return elmt;
                }) : ''}
           </Main> 
        </>
    )
}

export default layout
