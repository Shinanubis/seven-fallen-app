import React from 'react'

function Popup(props) {
    return (
        <div className="popup__background">
            <div className="popup__box">
                {props.children}
            </div>
        </div>
    )
}

export default Popup;
