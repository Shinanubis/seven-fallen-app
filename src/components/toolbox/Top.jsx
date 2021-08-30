import {MdKeyboardArrowDown} from 'react-icons/md';

function Top({title, onClick, isOpen}) {

    return (
        <div className="toolbox__top">
            {title && <p className="toolbox__top--title">{title}</p>}
            <div className="toolbox__top--btn" onClick={onClick}>
                <MdKeyboardArrowDown className={isOpen ? "toolbox__top--icon reverse" : "toolbox__top--icon"}/>
            </div>
        </div>
    )
}

export default Top;
