import React from 'react'
import './CardList.css'
import Card from './Card'

const List = (props) => {
    const {data} = props;
    
    return (
        <ul className="card__list">
            {
                data.map(elmt => {
                    return (
                        <Card url={elmt.url} alt={elmt.alt}/>
                    )
                }
            )}
        </ul>
    )
}

export default List
