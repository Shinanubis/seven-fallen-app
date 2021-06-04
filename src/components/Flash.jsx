import React, {useState, useEffect} from 'react'

function Flash(props){

    const {message, classes, errorClass,flash ,successClass, timing} = props;
    const [classesState, setClasses] = useState(classes);

    let newClasses = '';
    


    useEffect(() => {
        if(flash === true){
            setClasses(classes + ' ' + successClass)
        }
    },[classesState])

    return(
        <>    
            {console.log(flash)}
            {flash === null  ? <p className={classes}>{message}</p> : ''}
        </>
    );
}

export default Flash;