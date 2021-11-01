function Group({classes='form__group', children}) {
    return (
        <div className={classes}>
            {children}
        </div>
    )
}

export default Group;
