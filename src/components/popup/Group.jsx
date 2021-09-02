function Group({children, classes}) {
    return (
        <div className={classes ? classes : "popup__group"}>
            {children}
        </div>
    )
}

export default Group
