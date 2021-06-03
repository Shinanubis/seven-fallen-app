function Flash(props){
    const {message, classes} = props;

    return(
        <p className={classes}>{message}</p>
    );
}

export default Flash;