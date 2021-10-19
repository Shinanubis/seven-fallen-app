function Avatar({classes="member__avatar", url="https://i.pravatar.cc/50", alt="image"}) {
    return <img className={classes} src={url} alt={alt}/>
}

export default Avatar;
