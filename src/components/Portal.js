import {createPortal} from 'react-dom'

function withPortal(WrappedComponent, parent) {
    return createPortal(WrappedComponent, parent)
}

export default withPortal;