import Message from './Message';
import Icon from './Icon';
import './bottomMessage.css';

function BottomMessage({children}) {
    return (
        <div className="bottom__msg--container">
            {children}
        </div>
    )
}

BottomMessage.Text = Message;
BottomMessage.Icon = Icon;

export default BottomMessage;