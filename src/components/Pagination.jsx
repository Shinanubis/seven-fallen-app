import React, {useState, useEffect,useCallback} from 'react';
import {BsChevronLeft,BsChevronRight} from 'react-icons/bs'


function Pagination(props){
    const {
        options, 
        setPage, 
        setSize , 
        containerClasses,
        containerTextBlockClasses, 
        leftClasses, 
        rightClasses, 
        textClasses, 
        listSize = [],
        nextPage
    } = props;

    const [canNext, setCanNext] = useState(true);
    const fetchData = useCallback(() => {
        let newObj = {...options};
        newObj.page = options.page + 1;
        let datas = nextPage(newObj);
        return datas;
    });

    useEffect(async () => {

        let res = fetchData();

        if(res.code !== 200){
            setCanNext(false);
        }else{
            setCanNext(true);
        }

    },[fetchData]);

    return (
        <div className={containerClasses ?? "pagination__block"} >
            <div className={leftClasses ?? "pagination__arrow"} 
                 onClick={(e) => setPage(e, Number(options.page) - 1, options)}
            >
                <BsChevronLeft/>
            </div>
                <div className={containerTextBlockClasses ?? "pagination__text--block"}>
                {
                    listSize.map((elmt, index) => {
                        return <p key={index} className={textClasses ?? "pagination__text"} onClick={(e) => setSize(e, elmt)}>{elmt}</p>
                    })
                }
                </div>
            <div className={rightClasses ?? "pagination__arrow"} 
                 onClick={canNext === true ? (e) => setPage(e, Number(options.page) + 1, options) : (e) => setPage(e, 1, options)}
            >
                <BsChevronRight/>
            </div>
        </div>
    );
}

export default Pagination;