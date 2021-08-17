import {ImArrowDown2} from 'react-icons/im'

function Icon({icon}) {
    const Icon = icon;
    return (
        <>
            {
                Icon ? 
                    <Icon className="bottom__msg--icon"/>
                    :
                    <ImArrowDown2 className="bottom__msg--icon"/>
            }
        </>
    )
}

export default Icon;
