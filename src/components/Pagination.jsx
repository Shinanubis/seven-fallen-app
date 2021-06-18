import React, {useState, useEffect} from 'react';
import {BsChevronLeft,BsChevronRight} from 'react-icons/bs'


function Pagination(props){
    const {
        options,
        eventsToListen, 
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

    useEffect(async () => {

        let newObj = {...options};
        newObj.page = options.page + 1;
        let res = await nextPage(newObj);

        if(res.code === 200 && res.message.length === 0 && eventsToListen === false){
            setCanNext(false);
        }else{
            setCanNext(true);
        }

    },[options]);

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