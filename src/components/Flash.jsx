import React, {useState, useEffect} from 'react'

function Flash(props){

    const {message, classes, errorClass, successClass, timing, flash} = props;
    const [classesState, setClasses] = useState(classes);
    let newClasses = '';

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