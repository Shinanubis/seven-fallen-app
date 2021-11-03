import {Link} from 'react-router-dom';
import {useState} from 'react';

function Logo({url, alt}) {
    const [isLoaded, setIsLoaded] = useState(false);

    const handleLoad = (e) => {
        setIsLoaded(true);
    }


    return (
        <Link to="/login" onLoad={handleLoad}>
            <img className={isLoaded === true ? "heading__logo" : "d-none"} src={url} alt={alt ? alt : "no alt text"} />
        </Link>
        )
}

export default Logo;
