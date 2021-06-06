import React from 'react'

const Header = (props) => {
    const {classes} = props;
    return (
       <header className={classes ?? "header"}>
           {props.children}
       </header>
    )
}

export default Header
