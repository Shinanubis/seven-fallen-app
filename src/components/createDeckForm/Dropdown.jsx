import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {MdKeyboardArrowDown} from 'react-icons/md';

function Dropdown({options = [], title, icon, isOpen, setIsOpen, onClick}) {
    const Icon = icon ? icon : MdKeyboardArrowDown;
    const {t} = useTranslation();

    return (
        <div className="dropdown__container">
            <div className="dropdown__header">
                {title && <p className="dropdown__title">{title}</p>}
                <div className="dropdown__icon" onClick={() => setIsOpen(!isOpen)}><Icon className={isOpen === true ? "reverse": ""} /></div>
            </div>
            <div className={isOpen === true ? "dropdown__content open": "dropdown__content"} onClick={onClick}>
                {
                    options.map(elmt => {
                        return <div key={elmt.id} id={elmt.id} className="dropdown__item">{t(`kingdoms.${elmt.id}`)}</div>
                    })
                }
            </div>
        </div>
    )
}

export default Dropdown;
