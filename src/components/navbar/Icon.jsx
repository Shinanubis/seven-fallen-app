function Icon({icon, classes}) {
    let NewIcon = icon;
    return <NewIcon className={classes ? classes : "icon"} />
}

export default Icon
