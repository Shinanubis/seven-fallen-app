import './listContainer.css';

function ListContainer({classes, listClasses,onClick = () => null , children}) {
    return (
        <div className={classes ? classes : "list__container"}>
            <ul className={listClasses ? listClasses : "list"} onClick={onClick}>
                {children}
            </ul>
        </div>
    )
}

export default ListContainer;
