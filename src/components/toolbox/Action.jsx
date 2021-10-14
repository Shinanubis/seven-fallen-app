import { RiLoader3Line } from 'react-icons/ri';
import {memo} from 'react';

const Action = memo(function({id="action",icon,text="", isLoading = false, loader = ""}) {
    const Icon = icon && icon;
    return (
        <div id={id} className="toolbox__action">
            {console.log("action loading : " , isLoading)}
            {isLoading ? loader ? loader : <RiLoader3Line className="action__loader"/> : null}
            {icon ? <Icon/> : null}
            {text && <p className="toolbox__action--text">{text}</p>}
        </div>
    )
})

export default Action;
