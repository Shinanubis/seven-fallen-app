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
        message: {
            id: '',
            avatar:'',
            firstname:'',
            lastname:'',
            gender: '',
            username: '',
            is_visible: true,
            allow_collections: true
        }
    });
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        console.log(userInfos)
    },[userInfos]);

    useEffect(async () => {
        let response = await getProfile(id);
        setUserInfos(response);
    },[]);

    const handleChange = (e) => {
        switch(e.target.id){

            case 'firstname':
                setUserInfos(prevState => {
                    let newObj = {...prevState};
                    newObj.message.firstname = e.target.value;
                    return newObj; 
                });
                break;

            case 'lastname':
                setUserInfos(prevState => {
                    let newObj = {...prevState};
                    newObj.message.lastname = e.target.value;
                    return newObj; 
                });
                break;
            case 'username':
                setUserInfos(prevState => {
                    let newObj = {...prevState};
                    newObj.message.username = e.target.value;
                    return newObj; 
                });
                break;
            case 'email':
                setUserInfos(prevState => {
                    let newObj = {...prevState};
                    newObj.message.email = e.target.value;
                    return newObj; 
                });
                break;
            case 'female' :
                setUserInfos(prevState => {
                    let newObj = {...prevState};
                    newObj.message.gender = e.target.value;
                    return newObj; 
                });
                break;
            case 'male' :
                e.target.checked = true;
                setUserInfos(prevState => {
                    let newObj = {...prevState};
                    newObj.message.gender = e.target.value;
                    return newObj; 
                });
                break;
            case 'other' :
                setUserInfos(prevState => {
                    let newObj = {...prevState};
                    newObj.message.gender = e.target.value;
                    return newObj; 
                });
                break;
            default:
                console.error(`Something wrong with ${e.target.id}`);
        }
    }

    const handleClick = () => {
        return;
    }


    return isLoaded === true ? (
        <Main classes="profile__page">
                <form className="form" onChange={handleChange}>
                        <div className="profile__heading">
                            <HiUserCircle className="profile__avatar"/>
                            <h4 className="profile__username"></h4>
                            <p className="profile__userid"></p>
                        </div>
                        <div className="form--section" >
                            <h4 className="form__section--title">Contact</h4>
                            <div className="form__radio--group">
                                <div className="row">
                                    <div className="form__radio--button">
                                        <label className="form__radio--label" htmlFor="female">F</label>
                                        <input className="form--radio" type="radio" name="gender" id="female" value="F"/>
                                    </div>
                                    <div className="form__radio--button">
                                        <label className="form__radio--label" htmlFor="male">M</label> 
                                        <input className="form--radio"type="radio" name="gender" id="male" value="M"/>
                                    </div>
                                    <div className="form__radio--button">
                                        <label className="form__radio--label" htmlFor="other">Autre</label> 
                                        <input className="form--radio"type="radio" name="gender" id="other" value="Other"/>
                                    </div>
                                </div>
                            </div>
                            <input id="firstname" 
                                   className="form--input" 
                                   type="text"
                                   placeholder="firstname" 
                                   value={userInfos.message.firstname}
                            />
                            <input id="lastname"
                                   type="text" 
                                   className="form--input" 
                                   placeholder="lastname" 
                                   value={userInfos.message.lastname}
                            />
                            <input id="username"
                                   type="text" 
                                   className="form--input" 
                                   placeholder="username" 
                                   value={userInfos.message.username}
                            />
                            <input id="email"
                                   type="email" 
                                   className="form--input" 
                                   placeholder="email" 
                                   value={userInfos.message.email}
                            />
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
        <Loader condition={userInfos.code === 200} 
                loaderIcon={RiLoader3Line} 
                setLoaded={setIsLoaded} 
        />
    )
}

export default ProfileForm
