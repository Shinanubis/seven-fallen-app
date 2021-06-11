import React from 'react';
import {AiFillCloseCircle} from 'react-icons/ai'

function Popup(props) {

    const {datas, buttonText, onClickButton} = props;

    return (
        <div className="popup__container">
            <div className="popup__box">
                <form className="popup__form">
                    <h3 className="popup__title">Filters :</h3>

                    {Object.keys(datas).map(title => {
                        if(datas[title].type === "checkbox"){                            
                            return (
                                <div className="popup__form--section">
                                    <h4 className="popup__option--name">{title}</h4>
                                        {datas[title].values.map((elmt, index) => {
                                                    return (
                                                        <div className="popup__option--container">
                                                            <label className="popup__option--label" htmlFor={elmt}>{datas[title].displayed[index]}</label>
                                                            <input className="popup__option--input" type="checkbox" id={elmt} name={elmt} value={elmt}/>
                                                        </div>
                                                    )
                                                
                                            })}
                                </div>
                            )
                        }

                        if(datas[title].type === "radio"){           
                            return (
                                <div className="popup__form--section">
                                    <h4 className="popup__option--name">{title}</h4>
                                        {datas[title].values.map((elmt,index)=> {
                                                return (
                                                    <div className="popup__option--container">
                                                        <label className="popup__option--label" htmlFor={elmt}>{datas[title].displayed[index]}</label>                
                                                        <input className="popup__option--input" type="radio" id={elmt} name={title} />
                                                    </div>
                                                )
                                        })}
                                </div>
                            )
                        }
                    })}
                </form>
            </div>
            <button className="btn popup__button" onClick={onClickButton}>{buttonText}</button>
        </div>
    )
}

export default Popup;
