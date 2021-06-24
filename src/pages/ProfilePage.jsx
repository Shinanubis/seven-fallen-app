import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

/* api */
import {getProfile} from '../api/Profile';

/* components */
import {HiUserCircle} from 'react-icons/hi';
import Button from '../components/Button';
import Main from '../layouts/Main';



const ProfileForm = () => {

    const { id } = useParams();
    const [userInfos,setUserInfos] = useState({
        code: null,
        message: null
    });

    useEffect(async () => {
        let response = await getProfile(id);
        setUserInfos(response);
    },[]);

    const handleClick = () => {
        return;
    }


    return (
        <Main classes="profile__page">
            {console.log(userInfos)}
                <form className="form">
                        <div className="profile__heading">
                            <HiUserCircle className="profile__avatar"/>
                            <h4 className="profile__username">{userInfos.contact.username}</h4>
                            <p className="profile__userid">{userInfos.contact.id}</p>
                        </div>
                        <div className="form--section">
                            <h4 className="form__section--title">Contact</h4>
                            <div className="form__radio--group">
                                <div className="row">
                                    <div className="form__radio--button">
                                            <label className="form__radio--label" htmlFor="gender">F</label>
                                            <input className="form--radio" type="radio" name="gender" id="gender" value="F"/>
                                        </div>
                                        <div className="form__radio--button">
                                            <label className="form__radio--label" htmlFor="gender">M</label> 
                                            <input className="form--radio"type="radio" name="gender" id="gender" value="M"/>
                                        </div>
                                        <div className="form__radio--button">
                                            <label className="form__radio--label" htmlFor="gender">Autre</label> 
                                            <input className="form--radio"type="radio" name="gender" id="gender" value="M"/>
                                        </div>
                                    </div>
                            </div>
                            <input type="text" className="form--input" placeholder="firstname" disabled value={userInfos.contact.firstname}/>
                            <input type="text" className="form--input" placeholder="lastname" disabled value={userInfos.contact.lastname}/>
                            <input type="email" className="form--input" placeholder="email" disabled value={userInfos.contact.email}/>
                        </div>
                        <div className="form--section">
                            <h4 className="form__section--title">Coordinates</h4>
                            <input type="text" className="form--input" placeholder="city" disabled value={userInfos.coordinates.city}/>
                            <input type="text" className="form--input" placeholder="country" disabled value={userInfos.coordinates.country}/>
                        </div>
                        <div className="form--section">
                            <h4 className="form__section--title">Préferences</h4>
                            <input type="text" className="form--input" placeholder="username" disabled/>  
                            <input type="text" className="form--input" placeholder="username" disabled/>  
                            <input type="text" className="form--input" placeholder="username" disabled/>  
                            <input type="text" className="form--input" placeholder="username" disabled/>  
                        </div>
                        <Button classes="btn" text="update" onClick={handleClick}/>
                </form>
            </Main>
    )
}

export default ProfileForm
