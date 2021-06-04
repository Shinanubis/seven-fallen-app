import React, {useState, useEffect} from 'react'

function Flash(props){

    const {message, classes, errorClass,flash ,successClass, timing} = props;
    const [classesState, setClasses] = useState(classes);

    let newClasses = '';
    
    if(successClass && flash === true){
        setClasses(classes + ' ' + successClass);
    }

    if(errorClass && flash === false){
        setClasses(classes + ' ' + errorClass);
    }

    useEffect(() => {

        if(errorClass){
            newClasses = classesState.replace(errorClass, '')
        }
        
        if(successClass){
            newClasses = classesState.replace(successClass, '')
        }

        setTimeout(() => {
            setClasses(newClasses);        
        }, timing ? timing : 1000);
    },[])

    return(
            <p className={classesState}>{message}</p>
    );
}

export default Flash;