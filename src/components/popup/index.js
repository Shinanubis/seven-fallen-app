import Title from './Title';
import Overlay from './Overlay';
import Group from './Group';
import Text from './Text';
import Button from './Button';
import InputText from './InputText';
import InputRadio from './InputRadio';
import Label from './Label';
import './style.css';

function Popup({children, isOpen, onClick}){
    return (
        <Overlay classes={isOpen ? "popup__overlay" : "d-none"}>
            <div className="popup" onClick={onClick && onClick}>
                {children}
            </div>
        </Overlay>
    )
}


Popup.Label = Label;
Popup.InputRadio = InputRadio;
Popup.InputText = InputText;
Popup.Title = Title;
Popup.Group = Group;
Popup.Text = Text;
Popup.Button = Button;

export default Popup;