import {memo, useState, useEffect, useRef} from 'react';
import {difference} from 'lodash'

function MemoList({
    id="input__list--id", 
    listId = "data__list" ,
    classes = "input__text",
    classesList = "suggestions__list",
    classesListItem = "suggestions__list--item",
    dataList=[],
    resetList = () => [],
    resetField = () => [],
    setValue= () => [], 
    name="input__list", 
    placeholder="enter value",
}) {

    const [clicked, setClicked] = useState(false);

    let inputRef = useRef();

    const handleListClick = function(e){
        e.stopPropagation();
        inputRef.current.value = e.target.textContent;
        setValue(e.target.id);
        setClicked(true);
    }

    const handleChange = function (e){
        
        if(e.target.value === ''){
            console.log(e.target.value)
            setValue('')
        }
    }

    const handleBlur = function(e){
        e.stopPropagation();
        setClicked(true);
    }

    useEffect(() => {
        let timer = '';

        if(clicked){
            timer = setTimeout(() => {
                setClicked(false);
                resetList();
            }, 250)
        }

        return () => clearTimeout(timer);

    }, [clicked])

    return (
        <>
            <input 
                id={id}
                ref={inputRef} 
                className={classes} 
                type="text" 
                placeholder={placeholder} 
                name={name}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            {dataList.length > 0 &&
                <ul className={classesList} onClick={handleListClick}>
                    {
                        dataList.map(elmt => <li key={elmt.name} id={elmt.id} className={classesListItem}>{elmt.name}</li>)
                    }
                </ul> 

            }
        </>
    )
}

const List = memo(MemoList);
export default List;
