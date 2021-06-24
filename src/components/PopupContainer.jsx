import React,{forwardRef} from 'react';

const PopupContainer = forwardRef((props, ref) => {
    const {classes} = props;
    return (
        <div ref={ref} className={classes ? classes : "popup__container"}>
                {props.children}
        </div>
    )
})

export default PopupContainer;
