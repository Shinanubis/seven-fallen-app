import React from 'react'

function Pseudo({pseudo}) {
    return (
        <div>
            {pseudo ? pseudo : "Unknow"}
        </div>
    )
}

export default Pseudo
