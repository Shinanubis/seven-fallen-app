import {Link} from 'react-router-dom'

function Link({ classes, to, children }) {
    return <Link className={classes ? classes : "menu__link"} to={to ? to : "/"}>{children}</Link>
}

export default Link;
