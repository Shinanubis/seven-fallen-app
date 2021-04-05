import React from 'react'
import Header from './Header'
import Main from './Main'

const layout = ({children}) => {
        return (
        <>
           <Main classes="page">
               {children instanceof Array ? children.map((elmt, index) => {
                   return elmt;
                }) : ''}
           </Main> 
        </>
    )
}

export default layout
