function Label({children, htmlFor}) {
    return <label className="popup__label" htmlFor={htmlFor}>{children}</label>
}

export default Label
