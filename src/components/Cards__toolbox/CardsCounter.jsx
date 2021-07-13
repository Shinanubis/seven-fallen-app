import React from 'react'

function CardsCounter(props) {
    const {classes, value} = props;

    return <p className={classes ? classes : "d-none"}>X&nbsp;{value}</p>;           
    
}

export default CardsCounter;
