import LogoFallen from "../../img/logos/7-fallen-logo-2.png";

function Logo(url, alt) {
    return <img className="heading__logo" src={url} alt={alt ? alt : "no alt text"} />
}

export default Logo;
