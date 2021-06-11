import React from 'react'

function Popup(props) {

    const {datas} = props;

    return (
        <div className="popup__container">
            <div className="popup__box">
                <form className="form">
                    <h3>Filters :</h3>
                    {Object.keys(datas).map(title => {
                        return (
                            <h4>{title}</h4>
                        )
                    })}
                </form>
            </div>
        </div>
    )
}

export default Popup;
