import Group from './Group';
import InputFile from './InputFile';
import InputText from './InputText';
import InputRadio from './InputRadio';
import Label from './Label';
import Title from './Title';
import List from './InputList';
import './style.css';

function Form({children, classes = "form", onChange = (e) => null, onClick = (e) => null}) {
    return (
        <form className={classes} onChange={onChange}>
            {children}
        </form>
    )
}

Form.Group = Group;
Form.Text = InputText;
Form.File = InputFile;
Form.Radio = InputRadio;
Form.Label = Label;
Form.Title = Title;
Form.List = List;

export default Form;
