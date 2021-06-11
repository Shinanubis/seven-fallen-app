import React from 'react'

function Popup(props) {

    const {datas} = props;

    return (
        <div className="popup__container">
            <div className="popup__box">
                <form className="popup__form">
                    <h3 className="popup__title">Filters :</h3>

                    {Object.keys(datas).map(title => {
                        if(title.type === "checkbox"){
                            console.log(title.type)
                            return (
                                <div className="popup__form--section">
                                    <h4 className="popup__option--name">{title}</h4>
                                        {datas[title].values.map(elmt => {
                                                return (
                                                    <div className="popup__option--container">
                                                        <input className="popup__option--input" type="checkbox" id={elmt} name={elmt} />
                                                        <label className="popup__option--label" htmlFor={elmt}>{elmt}</label>
                                                    </div>
                                                )
    
                                        })}
                                </div>
                            )
                        }

                        if(title.type === "radio"){
                            console.log(title.type)
                            return (
                                <div className="popup__form--section">
                                    <h4 className="popup__option--name">{title}</h4>
                                        {datas[title].values.map(elmt => {
                                                return (
                                                    <div className="popup__option--container">
                                                        <input className="popup__option--input" type="checkbox" id={elmt} name={elmt} />
                                                        <label className="popup__option--label" htmlFor={elmt} name={title}>{elmt}</label>
                                                    </div>
                                                )
    
                                        })}
                                </div>
                            )
                        }
                    })}
                </form>
            </div>
        </div>
    )
}

export default Popup;
