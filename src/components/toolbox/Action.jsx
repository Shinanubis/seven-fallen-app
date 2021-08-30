import {MdKeyboardArrowDown} from 'react-icons/md';

function Action({icon}) {
    const Icon = icon && icon;
    return (
        <div className="toolbox__action">
            {icon ? <Icon/> : <MdKeyboardArrowDown/>}
        </div>
    )
}

export default Action;
