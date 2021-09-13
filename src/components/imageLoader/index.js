import {useState, useRef, useEffect} from 'react';
import {BiLoaderAlt} from 'react-icons/bi';
import './style.css';

const DefaultLoader = <div className="loader__container"><BiLoaderAlt className="loader"/></div>;

function ImageLoader({children, loader = () => DefaultLoader, variant, classes="image__loader"}){
    const [imageLoaded, setImageLoaded] = useState(false);
    const Loader = loader;
    function handleLoad(e){
        setImageLoaded(true);
        e.target.classList.remove("d-none");
    }


    switch(variant){
        case 'li':
            return (
                <li className={classes} onLoad={handleLoad}>
                    {children}
                    {imageLoaded === false &&
                        <Loader />
                    }
                </li>
            )
        default:
            return (
                <div className={classes} onLoad={handleLoad}>
                    {children}
                    {imageLoaded === false && <BiLoaderAlt className="loader"/>}
                </div>
            )
    }
}

export default ImageLoader;