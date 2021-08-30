function KingdomLogo({classes, logoUrl, alt}) {
    return <img className={classes ? classes : "icon"} src={logoUrl} alt={alt}/>
}

export default KingdomLogo;
