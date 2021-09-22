import Group from './Group';
import InputFile from './InputFile';
import InputText from './InputText';
import InputRadio from './InputRadio';
import InputCheckbox from './InputCheckbox';
import Label from './Label';
import Title from './Title';
import List from './InputList';
import './style.css';

function Form({children, classes = "form", onChange = (e) => null, onClick = (e) => null}) {
    return (
        <form className={classes} autocomplete="off" onChange={onChange}>
            {children}
        </form>
    )
}


Form.Checkbox = InputCheckbox;
Form.Group = Group;
Form.Text = InputText;
Form.File = InputFile;
Form.Radio = InputRadio;
Form.Label = Label;
Form.Title = Title;
Form.List = List;

export default Form;
