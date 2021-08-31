function Title({text}) {
    return (
        <h3 className="popup__title">
            {text ? text : "popup title placeholder ..."}
        </h3>
    )
}

export default Title;