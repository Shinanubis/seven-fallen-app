import React, {useState, useEffect} from 'react'

function Flash(props){

    const {message, classes, errorClass,flash ,successClass, timing} = props;
    const [classesState, setClasses] = useState(classes);

    let newClasses = '';
    


    useEffect(() => {
        if(flash === false){
            setClasses(classes + ' ' + errorClass)
        }
    },[classesState])

    return(
        <>    
            {console.log(flash)}
            <p className={classes}>{message}</p> : ''
        </>
    );
}

export default Flash;