import React from 'react'

function CardsCounter(props) {
    const {classesContainer, classesInner, value} = props;

    return (
        <div className={classesContainer ? classesContainer : "cards__counter--container"}>
            <p className={classesInner ? classesInner : "cards__counter"}>{value}</p>
        </div>
    )
}

export default CardsCounter
