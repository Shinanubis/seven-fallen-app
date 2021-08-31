function Text({text}) {
    return (
        <p className="popup__text">
            {text ? text : "popup text placeholder ..."}  
        </p>
    )
}

export default Text
