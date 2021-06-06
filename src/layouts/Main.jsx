import React from 'react'

const Main = (props) => {
    return (
        <main id="main" className={props.classes}>
            {props.children}
        </main>
    )
}

export default Main
