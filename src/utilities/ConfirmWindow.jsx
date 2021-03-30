import React from 'react'

const ConfirmWindow = (props) => {
    const {text} = props
    return (
        <>
            {window.confirm(text)}
        </>
    )
}

export default ConfirmWindow
