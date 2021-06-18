import React,{ useEffect, useRef} from 'react';
import {AiFillCloseCircle} from 'react-icons/ai'

function Popup(props) {

    const {
            datas, 
            buttonResetText, 
            actionClose, 
            actionReset, 
            actionSelect,
            setCheckBoxes,
            checkboxesState,
            mode,
        } = props;

    const handleClickCheckBoxes = (e) => {
        let checkboxes = null;
        if(mode === 'unique'){
            checkboxes = Array.from(document.getElementsByClassName('option__kingdom'));
        }else{
            checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]')) 
        }

        let checkBoxesState = [];
        checkboxes.map(elmt => {
            return checkBoxesState.push(elmt.checked);
        })
        setCheckBoxes(checkBoxesState);
    }

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
                    <div className="popup__form--section" >
                        <h4 className="popup__option--name">Options for kingdoms</h4>
                        <div className="popup__option--container">
                            <label className="popup__option--label" htmlFor="options-select">Set options :</label>
                            <select id="popup__options--select" name="kingdom-options-set" onChange={actionSelect}>
                                <option value="">Default</option>
                                {mode === 'unique' ? 
                                    <option value="unique" selected>Unique</option> 
                                    : 
                                    <option value="unique" >Unique</option>
                                }
                                {mode === 'combination' ? 
                                    <option value="combination" selected>Combination</option>
                                    :
                                    <option value="combination">Combination</option>
                                }
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
                                                            <input id={elmt} 
                                                                   className={mode === 'unique' ? 'popup__option--input option__kingdom': "popup__option--input"} 
                                                                   type={mode === "unique" ? "radio" : "checkbox"} 
                                                                   name={datas[title].field_name} 
                                                                   onChange={datas[title].onChange} 
                                                                   checked={checkboxesState[index]} 
                                                                   value={elmt}
                                                            />
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
