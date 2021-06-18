import React,{useState, useEffect} from 'react';
import {AiFillCloseCircle} from 'react-icons/ai'

function Popup(props) {

    const {
            datas, 
            buttonResetText, 
            actionClose, 
            actionReset, 
            actionSelect
        } = props;
    
    const [checkBoxes, setCheckBoxesState] = useState([]);

    const handleClickCheckBoxes = (e) => {
        let checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]'));
        let checkBoxesState = [];
        checkboxes.map(elmt => {
            return checkBoxesState.push(elmt.checked);
        })
        setCheckBoxesState(checkBoxesState);
    }

    useEffect(() => {
        console.log(checkBoxes)
    }, [checkBoxes]);

    return (
        <div className="popup__container">
            <div className="popup__inner--container">
            <div className="popup__box">
                <form className="popup__form" enctype="multipart/form-data">
                    <div className="popup__heading">
                        <div  className="popup__close" onClick={e => actionClose(e)}>
                            <AiFillCloseCircle />
                        </div>
                    </div>
                    <div className="popup__form--section d-none" >
                        <h4 className="popup__option--name">Options for kingdoms</h4>
                        <div className="popup__option--container">
                            <label className="popup__option--label" htmlFor="options-select">Set options :</label>
                            <select id="popup__options--select" name="kingdom-options-set" onChange={actionSelect}>
                                <option value="">Default</option>
                                <option value="unique">Unique</option>
                                <option value="combination">Combination</option>
                            </select>
                        </div>
                    </div>
                    {Object.keys(datas).map(title => {
                        if(datas[title].type === "checkbox"){                            
                            return (
                                <div className="popup__form--section " onClick={handleClickCheckBoxes}>
                                    <h4 className="popup__option--name" >{title}</h4>
                                        {datas[title].values.map((elmt, index) => {
                                                    return (
                                                        <div className="popup__option--container">
                                                            <label className="popup__option--label" htmlFor={elmt}>{datas[title].displayed[index]}</label>
                                                            <input className="popup__option--input" type="checkbox" id={elmt} name={datas[title].field_name} onChange={datas[title].onChange} value={elmt}/>
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
                                                        <input className="popup__option--input" type="radio" id={elmt} name={datas[title].field_name} onChange={datas[title].onChange} value={datas[title].values[index]}/>
                                                    </div>
                                                )
                                        })}
                                </div>
                            )
                        }

                    })}
                    <button type="reset" className="btn popup__button" onClick={actionReset}>{buttonResetText}</button>
                </form>
            </div>
            </div>
        </div>)
}

export default Popup;
