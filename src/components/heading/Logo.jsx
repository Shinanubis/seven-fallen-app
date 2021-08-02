import LogoFallen from "../../img/7-fallen-logo-2.png";

function Logo(url, alt) {
    return (
        <>
            <img className="heading__logo" src={url ? url : LogoFallen} alt={}/>
        </>
    )
}

export default Logo;
