function KingdomLogo({classes, icon, logoUrl, alt}) {
    const Icon = icon;
    return <img className={classes ? classes : "icon"} src={logoUrl} alt={alt}/>
}

export default KingdomLogo;
