import List from "./List";
import withInfiniteScroll from "../HOC/withInfiniteScroll";

function InfiniteList(props) {
    return (
        <List classes="subdeck list__content layout layout__1">
            {props.children}
        </List>
    )
}

InfiniteList = withInfiniteScroll(InfiniteList)
export default InfiniteList;
