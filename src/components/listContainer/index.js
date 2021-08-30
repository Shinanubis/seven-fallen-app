import './listContainer.css';

function ListContainer({classes, listClasses, children}) {
    return (
        <div className={classes ? classes : "list__container"}>
            <ul className={listClasses ? listClasses : "list"}>
                {children}
            </ul>
        </div>
    )
}

export default ListContainer;
