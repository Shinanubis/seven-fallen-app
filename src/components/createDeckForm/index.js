import Button from './Button';
import Dropdown from './Dropdown';
import Name from './Name';
import Title from './Title';
import './createDeckForm.css';

function CreateDeckForm({children}){
    return (
        <form className="create__deck--form">
            {children}
        </form>
    );
}

CreateDeckForm.Name = Name;
CreateDeckForm.Dropdown = Dropdown;
CreateDeckForm.Button = Button;
CreateDeckForm.Title = Title;

export default CreateDeckForm;