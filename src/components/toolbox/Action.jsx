function Action({id,icon,text}) {
    const Icon = icon && icon;
    return (
        <div id={id} className="toolbox__action">
            {icon ? <Icon/> : null}
            {text && <p className="toolbox__action--text">{text}</p>}
        </div>
    )
}

export default Action;
