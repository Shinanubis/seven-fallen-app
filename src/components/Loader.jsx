import React from 'react';

function Loader(props) {
    let { condition, setLoaded } = props;
    let LoaderIcon = props.loaderIcon;
    return (
        <div className="loader__block row justify-center align-center">
            {             
                condition
                ? 
                setLoaded(true) 
                : 
                null
            }
            <LoaderIcon className="loader"/>
        </div>
    )
}

export default Loader;
