import {memo, useState} from 'react';
import {difference} from 'lodash'

function areEqual (prevProps, nextProps){
     console.log("[test equality] : ", difference(nextProps.dataList, prevProps.dataList).length === 0)
     return prevProps === nextProps;
}

function MemoList({
    id="input__list--id", 
    listId = "data__list" ,
    classes = "input__list", 
    dataList=[], 
    name="input__list", 
    placeholder="enter value",
}) {
    return (
        <>
            <input id={id} list={listId} className={classes} type="list" placeholder={placeholder} name={name} />
            <datalist id={listId}>
                {dataList.length > 0 && 
                    dataList.map(elmt => <option key={elmt.id} id={elmt.id} value={elmt.name}>{elmt.name}</option>)
                }
            </datalist>
        </>
    )
}

const List = memo(MemoList, areEqual);
export default List;
