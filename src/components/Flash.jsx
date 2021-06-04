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
            }, timing ? timing : 1000);
        }

        console.log(classesState)
    },[])

    return(
        <>
            <p className={classesState}>{message}</p>
        </>
    );
}

export default Flash;