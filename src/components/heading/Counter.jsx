import React from 'react'

function Counter({count}) {

    return (
        <div className="heading__counter">
            {count > 0 ? `${count} Deck(s)` : "No decks"}
        </div>
    )
}

export default Counter
