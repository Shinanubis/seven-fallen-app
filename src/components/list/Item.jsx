function Item({classes = "list__item",children}) {
    return (
        <li className="list__item">
            {children}
        </li>
    )
}

export default Item;
