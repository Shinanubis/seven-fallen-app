import React, {useState, useEffect} from 'react'

function Flash(props){

    const {message, classes, errorClass,flash ,successClass, timing} = props;
    const [classesState, setClasses] = useState(classes);
    


    useEffect(() => {
        if(flash === false){
            setClasses(classes + ' ' + errorClass)
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