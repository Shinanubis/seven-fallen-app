import Counter from "./Counter";
import Logo from "./Logo";
import Pseudo from "./Pseudo";
import Filter from './Filter';

function Header(props) {
    return (
        <div className="heading">
            <div className="container">
                {props.children}
            </div>
        </div>
    )
}

Header.Count = Counter;
Header.Logo = Logo;
Header.Pseudo = Pseudo;
Header.Filter = Filter; 

export default Header;
