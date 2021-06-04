function Flash(props){
    const {message, classes, modifier} = props;

    return(
        <p className={classes}>{message}</p>
    );
}

export default Flash;