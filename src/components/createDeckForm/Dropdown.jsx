import {MdKeyboardArrowDown} from 'react-icons/md';

function Dropdown({options = [], defaultTitle, icon, isOpen, setIsOpen, onClick}) {
    const Icon = icon ? icon : MdKeyboardArrowDown;

    return (
        <div className="dropdown__container">
            <div className="dropdown__header">
                {defaultTitle && <p className="dropdown__title">{defaultTitle}</p>}
                <div className="dropdown__icon" onClick={() => setIsOpen(!isOpen)}><Icon className={isOpen === true ? "reverse": ""} /></div>
            </div>
            <div className={isOpen === true ? "dropdown__content open": "dropdown__content"} onClick={onClick}>
                {
                    options.map(elmt => {
                        return <div key={elmt.id} id={elmt.id} className="dropdown__item">{elmt.name}</div>
                    })
                }
            </div>
        </div>
    )
}

export default Dropdown;
