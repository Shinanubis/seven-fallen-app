function KingdomLogo({classes, icon}) {
    const Icon = icon;
    return <Icon className={classes ? classes : "icon"} />
}

export default KingdomLogo;
