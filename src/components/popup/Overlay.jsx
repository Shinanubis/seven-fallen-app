function Overlay({children, classes}) {
    return (
        <div className={classes ? classes : "popup__overlay"}>
            {children}
        </div>
    )
}

export default Overlay
