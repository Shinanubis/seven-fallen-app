import React,{useState} from 'react'
import './ProfilePage.css'

const ProfileForm = () => {
    return (
        <form className="form">
            <fieldset>
                <legend>Contact</legend>
                <div className="row">
                <div className="form__radio--group">
                            <label className="form__radio--label" htmlFor="gender">F</label>
                            <input className="form--radio" type="radio" name="gender" id="gender" value="F"/>
                        </div>
                        <div className="form__radio--group">
                            <label className="form__radio--label" htmlFor="gender">M</label> 
                            <input className="form--radio"type="radio" name="gender" id="gender" value="M"/>
                        </div>
                </div>
                <input type="text" className="form--input" placeholder="username" disabled/>

                <input type="text" className="form--input" placeholder="firstname" disabled/>
                <input type="text" className="form--input" placeholder="lastname" disabled/>
                <input type="email" className="form--input" placeholder="email" disabled/>   
            </fieldset>
            <fieldset>
                <legend>Location</legend>
                <input type="text" className="form--input" placeholder="coordinates" disabled/>  
            </fieldset>
            <fieldset>
                <legend>Preferences</legend>
                <input type="text" className="form--input" placeholder="username" disabled/>  
                <input type="text" className="form--input" placeholder="username" disabled/>  
                <input type="text" className="form--input" placeholder="username" disabled/>  
                <input type="text" className="form--input" placeholder="username" disabled/>  
            </fieldset>
        </form>
    )
}

export default ProfileForm
