import {Link} from 'react-router-dom'

function NewLink({ classes, to, children }) {
    return <Link className={classes ? classes : "menu__link"} to={to ? to : "/"}>{children}</Link>
}

export default NewLink;
