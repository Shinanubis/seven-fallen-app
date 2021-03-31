import React from 'react'

const List = (props) => {
    const {classes} = props
    return (
        <ul className={classes}>
            {props.children}
        </ul>
    )
}

export default List
