import React from 'react'

function Counter(props) {
    const {count} = props;
    return (
        <div className="heading__counter">
            {count ? "DECKS " + count : 0}
        </div>
    )
}

export default Counter
