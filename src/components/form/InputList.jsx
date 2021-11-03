import {memo, useState, useRef} from 'react';
import {debounce} from 'lodash'

const MemoList = function ({
    id="input__list--id", 
    listId = "data__list" ,
    classes = "input__text",
    classesList = "suggestions__list",
    classesListItem = "suggestions__list--item",
    dataListItemName="item",
    dataList=[],
    setValue= () => [], 
    name="input__list", 
    placeholder="enter value",
}) {

    const [isVisible, setIsVisible] = useState(false);
    let inputRef = useRef();

    const handleListClick = function(e){
        e.stopPropagation();
        inputRef.current.value = e.target.textContent;
        setValue(e.target.id);
        setIsVisible(false);
    }

    const handleChange = debounce(function (e){
        if(e.target.value.length === 0){
            return setIsVisible(false);
        }
        setIsVisible(true);
    },200)

    return (
        <>
            <input 
                id={id}
                ref={inputRef} 
                className={classes} 
                type="text" 
                placeholder={placeholder} 
                name={name}
                onChange={handleChange}
                autocomplete="off"
            />
            {(dataList.length > 0 && isVisible === true) &&
                <ul className={classesList} onClick={handleListClick} >
                    {
                        dataList.map(elmt => {
                            if(!elmt.name || !elmt.id){
                                return <li key={elmt} id={elmt} className={classesListItem} data-type={dataListItemName}>{elmt}</li>
                            }
                            return <li key={elmt.name} id={elmt.id} className={classesListItem} data-type={dataListItemName}>{elmt.name}</li>
                        })
                    }
                </ul> 

            }
        </>
    )
}

const List = memo(MemoList);
export default List;
