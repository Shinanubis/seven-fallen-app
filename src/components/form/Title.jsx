function Title({classes = "form__title", text}) {
    return (
        <h3 className={classes}>
            {text}
        </h3>
    )
}

export default Title;
