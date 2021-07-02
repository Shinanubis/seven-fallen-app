import React from 'react'
import Card from './Card'

const List = (props) => {
    const {data} = props;
    
    return data instanceof Array && data.length > 0 ? (
        <ul className="layout layout__3 mb-5">
            {
                data.map(elmt => {
                    return (
                        <Card key={elmt.id} url={elmt.url} alt={elmt.alt}/>
                    )
                }
            )}
        </ul>
    )
    :
    (
        <ul>

        </ul>
    )
}

export default List
