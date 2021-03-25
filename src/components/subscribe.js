import SubscribeForm from './subscribeForm'
import withPortal from './Portal'

function Subscribe () {
    return withPortal(
        <>
            <SubscribeForm />
        </>,
        document.getElementById('main')
    )
}

export default Subscribe;