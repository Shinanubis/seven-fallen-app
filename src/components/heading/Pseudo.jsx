import React from 'react'

function Pseudo({pseudo}) {
    return (
        <div className="heading__pseudo">
            {pseudo ? pseudo : "Unknow"}
        </div>
    )
}

export default Pseudo
