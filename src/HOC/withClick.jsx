import React from 'react'

const withClick = Component => (props) => {
    const {classes, onClick} = props;
    return (
        <Component className={classes ?? classes} onClick={onClick} />
    )
}

export default withClick;
