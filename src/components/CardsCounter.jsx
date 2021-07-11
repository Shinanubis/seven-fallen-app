import React from 'react'

function CardsCounter(props) {
    const {classes, value, isVisible} = props;

    return <p className={classes ? classes : "d-none"}>{value}</p>;           
    
}

export default CardsCounter;
