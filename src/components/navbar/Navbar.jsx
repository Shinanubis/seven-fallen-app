import Link from './Link';
import Icon from './Icon';

function Navbar({classes, children}) {
    return (
        <nav className={classes ? classes : "navbar"}>
            <div className="container">
                {children}
            </div>
        </nav>
    )
}

Navbar.Link = Link;
Navbar.Icon = Icon;
export default Navbar
