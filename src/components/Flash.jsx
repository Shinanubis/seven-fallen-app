import React, {useState, useEffect} from 'react'

function Flash(props){

    const {message, classes, errorClass,flash ,successClass, timing, handleFlash} = props;
    const [classesState, setClasses] = useState(classes);
    let afterClasses = '';


    useEffect(() => {

        if(flash === false){
            setClasses(classes + ' ' + errorClass)
            setTimeout(() => {
                afterClasses = classes.replace(errorClass, '');
                setClasses(afterClasses);
                handleFlash(null)
            }, timing ? timing : 1000);

        }

        
    },[flash])

    return(
        <>
            {console.log(flash)}
            <p className={classesState}>{message}</p>
        </>
    );
}

export default Flash;