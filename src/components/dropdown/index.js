import {useState} from 'react';
import {MdKeyboardArrowDown} from 'react-icons/md';

function Dropdown({options = [], title, icon}) {
    const [isOpen, setIsOpen] = useState(false);
    const Icon = icon ? icon : MdKeyboardArrowDown;

    return (
        <div className="dropdown__container">
            <div className="dropdown__header">
                {title && <p className="dropdown__title">{title}</p>}
                <div className="dropdown__icon" onClick={() => setIsOpen(!isOpen)}><Icon className={isOpen === true ? "reverse": ""} /></div>
            </div>
            <div className={isOpen === true ? "dropdown__content open": "dropdown__content"}>
                {
                    options.map(elmt => {
                        return <div key={elmt.id} className="dropdown--item">{elmt.value}</div>
                    })
                }
            </div>
        </div>
    )
}

export default Dropdown;
