import React, {useState, useEffect} from 'react'

function Flash(props){

    const {message, classes, modifier, timing} = props;
    const [classesState, setClasses] = useState(classes);

    useEffect(() => {
        console.log(classesState.split(' '))    
        setTimeout(() => {
            
        }, timing ? timing : 1000);
    },[])

    return(
        <p className={classesState}>{message}</p>
    );
}

export default Flash;