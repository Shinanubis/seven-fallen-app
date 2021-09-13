import React from 'react';

function Loader(props) {
    let LoaderIcon = props.loaderIcon;
    return (
        <div className="loader__block row justify-center align-center">
            <LoaderIcon className="loader"/>
        </div>
    )
}

export default Loader;
