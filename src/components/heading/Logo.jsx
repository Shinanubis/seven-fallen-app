function Logo({url, alt}) {
    return <img className="heading__logo" src={url} alt={alt ? alt : "no alt text"} />
}

export default Logo;
