//sub compoennts
import Avatar from './Avatar';
import Text from './Text';

//style
import './member.css';

function Member({classes="member", variant="div", children }) {
    if(variant === 'li'){
        return  <li className={classes}>
                    {children}
                </li>
    }
    return (
        <div className={classes}>
            {children}
        </div>
    )
}

Member.Avatar = Avatar;
Member.Text = Text;

export default Member;
