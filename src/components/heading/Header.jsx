import React from 'react'

function Header(props) {
    return (
        <div className="heading">
            <div className="container">
                {props.children}
            </div>
        </div>
    )
}

export default Header;
