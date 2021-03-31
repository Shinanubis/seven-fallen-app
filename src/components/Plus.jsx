import React from 'react'
import {GrAddCircle} from 'react-icons/gr'
import {Link} from 'react-router-dom'

const Plus = (props) => {
    return (
        <Link className="add__button" to={props.to}><GrAddCircle/></Link>
    )
}

export default Plus
