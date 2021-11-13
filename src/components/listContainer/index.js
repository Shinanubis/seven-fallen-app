import './listContainer.css';

function ListContainer({classes, listClasses,onClick = () => null , children}) {
    return (
        <div className={classes ? classes : "list__container"}>
            {children}
        </div>
    )
}

export default ListContainer;
