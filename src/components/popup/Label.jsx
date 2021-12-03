function Label({children, htmlfor, onClick}) {
    return <label className="popup__label" htmlFor={htmlfor} onClick={onClick}>{children}</label>
}

export default Label
