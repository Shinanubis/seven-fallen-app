import React from 'react'

function CardsCounter(props) {
    const {classes, value} = props;

    return (
            <p className={classes ? classes : "cards__counter"}>{value}</p>
    )
}

export default CardsCounter
