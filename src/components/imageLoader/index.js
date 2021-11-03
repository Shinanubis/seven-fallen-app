import {useState} from 'react';
import {BiLoaderAlt} from 'react-icons/bi';
import './style.css';

const DefaultLoader = <div className="loader__container"><BiLoaderAlt className="loader"/></div>;

function ImageLoader({children, id,loader = () => DefaultLoader, variant, classes="image__loader"}){
    const [imageLoaded, setImageLoaded] = useState(false);
    const Loader = loader;
    function handleLoad(e){
        e.stopPropagation();
        setImageLoaded(true);
        e.target.classList.remove("d-none");
    }


    switch(variant){
        case 'li':
            return (
                <li key={id} className={classes} onLoad={handleLoad}>
                    {children}
                    {imageLoaded === false &&
                        <Loader />
                    }
                </li>
            )
        default:
            return (
                <div key={id} className={classes} onLoad={handleLoad}>
                    {children}
                    {imageLoaded === false && <BiLoaderAlt className="loader"/>}
                </div>
            )
    }
}

export default ImageLoader;