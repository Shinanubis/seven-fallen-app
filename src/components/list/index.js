import {forwardRef} from 'react';
import Item from './Item';
import './style.css'

const List = forwardRef(function ({
        classes = "list",
        children
    }, ref){
    return (
        <ul ref={ref} className={classes}>
            {children}
        </ul>
    )
})

List.Item = Item;

export default List;