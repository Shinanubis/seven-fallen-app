import React from 'react'

function Popup(props) {

    const {datas} = props;

    return (
        <div className="popup__background">
            <div className="popup__box">
                <select>
                    {Object.keys(datas).map(title => {
                        return (
                            <optgroup label={title}>
                                {
                                    datas[title].map(content => {
                                        return (
                                            <option value={content}>{content.replace('_', ' ')}</option>
                                        );
                                    })
                                }
                            </optgroup>
                        )
                    })}
                </select>
            </div>
        </div>
    )
}

export default Popup;
