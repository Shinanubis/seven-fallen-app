import React from 'react'

function CardsCounter(props) {
    const {classes, value, isVisible} = props;

    return isVisible === true ? (<p className={classes ? classes : "d-none"}>{value}</p>) : null;           
    
}

export default CardsCounter;
