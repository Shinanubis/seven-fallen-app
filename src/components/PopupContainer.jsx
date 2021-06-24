import React,{forwardRef} from 'react';

const PopupContainer = forwardRef((props, ref) => {
    const {classes, classesInner} = props;
    return (
        <div ref={ref} className={classes ? classes : "popup__container"}>
            <div className={classesInner ? classesInner : "popup__inner"}>
                {props.children}
            </div>
        </div>
    )
})

export default PopupContainer;
