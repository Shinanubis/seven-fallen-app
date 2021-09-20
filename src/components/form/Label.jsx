function Label({htmlFor, classes="form__label", children}) {
    return (
        <label className={classes} htmlFor={htmlFor}>
            {children}
        </label>
    )
}

export default Label
