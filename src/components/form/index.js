import Group from './Group';
import Dropdown from './Dropdown';
import InputFile from './InputFile';
import InputText from './InputText';
import InputRadio from './InputRadio';
import InputCheckbox from './InputCheckbox';
import InputSearch from './InputSearch';
import Label from './Label';
import Title from './Title';
import List from './InputList';
import Button from './Button';
import './style.css';

function Form({
        children,
        id = "form",
        classes = "form", 
        onChange = (e) => null, 
        onClick = (e) => null
    }) 
    {
        return (
            <form 
                id={id}
                className={classes} 
                autocomplete="off" 
                onChange={onChange} 
                onClick={onClick}
            >
                {children}
            </form>
    )
}

Form.Dropdown = Dropdown;
Form.Checkbox = InputCheckbox;
Form.Group = Group;
Form.Text = InputText;
Form.File = InputFile;
Form.Radio = InputRadio;
Form.Label = Label;
Form.Title = Title;
Form.List = List;
Form.Button = Button;
Form.Search = InputSearch;

export default Form;
