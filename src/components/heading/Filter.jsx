function Filter({icon = '', onClick = () => null}) {
    const Icon = icon && icon;
    return(
        <div className="heading__filter" onClick={onClick}>
            <Icon className="heading__filter--icon"/>
        </div>
    )
}

export default Filter;
