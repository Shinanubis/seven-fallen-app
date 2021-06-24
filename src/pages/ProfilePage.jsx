import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

/* api */
import {getProfile} from '../api/Profile';

/* components */
import {HiUserCircle} from 'react-icons/hi';
import { RiLoader3Line } from 'react-icons/ri'
import Button from '../components/Button';
import Main from '../layouts/Main';
import Loader from '../components/Loader';



const ProfileForm = () => {

    const { id } = useParams();
    const [userInfos,setUserInfos] = useState({
        code: null,
        message: null
    });
    const [isLoaded, setIsLoaded] = useState(false);
    const [test, setTest] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setTest(true);
        }, 1000)
    });

    useEffect(async () => {
        let response = await getProfile(id);
        setUserInfos({...userInfos, response});
    },[]);

    const handleClick = () => {
        return;
    }


    return isLoaded === true ? (
        <Main classes="profile__page">
                <form className="form">
                        <div className="profile__heading">
                            <HiUserCircle className="profile__avatar"/>
                            <h4 className="profile__username"></h4>
                            <p className="profile__userid"></p>
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
                            <input type="text" className="form--input" placeholder="firstname" disabled value={userInfos.message[0].firstname && userInfos.message[0].firstname}/>
                            <input type="text" className="form--input" placeholder="lastname" disabled value={userInfos.message[0].lastname && userInfos.message[0].lastname}/>
                            <input type="text" className="form--input" placeholder="username" disabled value={userInfos.message[0].username && userInfos.message[0].username}/>
                            <input type="email" className="form--input" placeholder="email" disabled value={userInfos.message[0].email && userInfos.message[0].email}/>
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
    :
    (
        <Loader condition={test === true} loaderIcon={RiLoader3Line} setLoaded={setIsLoaded} />
    )
}

export default ProfileForm
