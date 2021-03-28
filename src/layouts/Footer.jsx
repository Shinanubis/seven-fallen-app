import React from 'react'
import './Footer.css'

const Footer = (props) => {
    const {classes} = props; 
    return (
        <footer className={classes}>
            {props.children}
        </footer>
    )
}

export default Footer
