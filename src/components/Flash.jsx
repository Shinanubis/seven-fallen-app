import React, {useState, useEffect} from 'react'

function Flash(props){

    const {message, classes, errorClass,flash ,successClass, timing} = props;
    const [classesState, setClasses] = useState(classes);

    let newClasses = '';
    


    useEffect(() => {
        setTimeout(() => {
    
        }, timing ? timing : 1000);
    },[])

    return(
        <>    
            {console.log(flash)}
            {flash == null || <p className={classesState}>{message}</p> }
        </>
    );
}

export default Flash;