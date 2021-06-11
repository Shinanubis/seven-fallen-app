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
                            <>
                                <h4>{title}</h4>
                                <div>
                                    {datas[title].map(elmt => {
                                        return (
                                            <>
                                                <input type="checkbox" id={elmt} name={elmt} />
                                                <label for={elmt}>{elmt}</label>
                                            </>
                                        )
                                    })}
                                </div>
                            </>
                        )
                    })}
                </form>
            </div>
        </div>
    )
}

export default Popup;
