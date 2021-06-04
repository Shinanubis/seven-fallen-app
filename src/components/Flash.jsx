import React, {useState, useEffect} from 'react'

function Flash(props){

    const {message, classes, modifier, timing} = props;
    const [classesState, setClasses] = useState(classes);

    useEffect(() => {
        
        const newClasses = classes.replace(modifier, '');
        setTimeout(() => {
            setClasses(newClasses);        
        }, timing ? timing : 1000);
    },[])

    return(
        <p className={classesState}>{message}</p>
    );
}

export default Flash;