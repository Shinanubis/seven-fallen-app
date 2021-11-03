import {HiOutlineUserCircle} from 'react-icons/hi'

const Avatar = function({classes = "avatar", url="", alt="user avatar"}){

    return (
        <>
            {url ? 
                <img className={classes} src={url} alt={alt}/> 
                    : 
                <div className={classes}>
                    <HiOutlineUserCircle className="default"/>
                </div>
            }
        </>
    );
}


export default Avatar;