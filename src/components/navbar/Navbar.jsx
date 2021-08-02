import NewLink from './Link';
import Icon from './Icon';

function Navbar({id,classes, children}) {
    return (
        <nav id={id ? id : "navbar"} className={classes ? classes : "navbar"}>
            <div className="container">
                {children}
            </div>
        </nav>
    )
}

Navbar.Link = NewLink;
Navbar.Icon = Icon;
export default Navbar
