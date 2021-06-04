import React, {useState, useEffect} from 'react'

function Flash(props){

    const {message, classes, modifier, timing} = props;
    const [classesState, setClasses] = useState(classes);

    useEffect(() => {
    
        const classIndexToRemove = classesState.split(' ').indexOf(modifier);
        const newClassesList = classesState.splice(classIndexToRemove, 1);

        setTimeout(() => {
            setClasses(newClassesList);        
        }, timing ? timing : 1000);
    },[])

    return(
        <p className={classesState}>{message}</p>
    );
}

export default Flash;