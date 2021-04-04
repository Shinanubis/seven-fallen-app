import React from 'react'
import Header from './Header'
import Main from './Main'

const layout = ({children}) => {
        return (
        <>
           <Header>
                {children instanceof Array ? children[0] : children}    
           </Header>
           <Main classes="page">
               {children instanceof Array ? children.map((elmt, index) => {
                   if(index === 0) return;
                   return elmt;
                }) : ''}
           </Main> 
        </>
    )
}

export default layout
