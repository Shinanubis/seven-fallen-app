import React,{useState, useEffect, useRef} from 'react';
import { useParams } from 'react-router-dom';

/* api */
import {getProfile, updateProfile} from '../api/Profile';

/* components */
import {HiUserCircle} from 'react-icons/hi';
import { RiLoader3Line } from 'react-icons/ri'
import Button from '../components/Button';
import Main from '../layouts/Main';
import Loader from '../components/Loader';

/* module */
import regexModule  from '../modules/regex';



const ProfileForm = () => {

    const { id } = useParams();
    const [userInfos,setUserInfos] = useState({
        code: null,
        message: {
            id: '',
            firstname:'',
            lastname:'',
            gender: 'other',
            username: '',
            is_visible: true,
            allow_collections: true
        }
    });
    const [isLoaded, setIsLoaded] = useState(false);

    /* ref */
    const firstnameInput = useRef(null);
    const lastnameInput = useRef(null);
    const usernameInput = useRef(null);
    const emailInput = useRef(null);

    useEffect(() => {
        return () => {

            if(firstnameInput.current !== null){
                if(firstnameInput.current.classList.contains('good__input')){
                    firstnameInput.current.classList.remove('good__input')
                };
    
                if(firstnameInput.current.classList.contains('bad__input')){
                    firstnameInput.current.classList.remove('bad__input')
                };
            }
        }
    },[userInfos]);

    useEffect(async () => {
        let response = await getProfile(id);
        setUserInfos(response);
    },[]);

    const handleChange = (e) => {
        switch(e.target.id){

            case 'firstname':

                if(regexModule.regex_name.test(e.target.value) === true){
                    firstnameInput.current.classList.add('good__input');
                }else{
                    firstnameInput.current.classList.add('bad__input');
                }

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
            case 'visible' :
                setUserInfos(prevState => {
                    let newObj = {...prevState};
                    newObj.message.is_visible = e.target.checked;
                    return newObj; 
                });
                break;
            case 'collection' :
                setUserInfos(prevState => {
                    let newObj = {...prevState};
                    newObj.message.allow_collections = e.target.checked;
                    return newObj; 
                });
                break;
            default:
                console.error(`Something wrong with ${e.target.id}`);
        }
    }

    const handleClick = async (e) => {
        e.preventDefault();
        let form = new FormData();
        Object.keys(userInfos.message).map(elmt => {
            form.append(elmt, userInfos.message[elmt]);
        });

        let response = await updateProfile(form);
        if(response.code === 200){
            setUserInfos(response)
        }
        return true;
    }


    return isLoaded === true ? (
        <Main classes="profile__page">
                <form className="form" onChange={handleChange}>
                        <div className="profile__heading">
                            <HiUserCircle className="profile__avatar"/>
                            <h4 className="profile__username"></h4>
                            <p className="profile__userid"></p>
                        </div>
                        <div className="form__section w-80 mb-2">
                            <h4 className="form__section--title">Profile options</h4>
                        <div className="row justify-between w-100">
                            <label className="form__label mr-2" htmlFor="visible">Public</label>
                            <input id="visible" className="form__checkbox mb-1" type="checkbox" name="visible" checked={userInfos.message.is_visible}/>
                        </div>
                        <div className="row justify-between w-100">
                            <label className="form__label mr-2" htmlFor="collection">Collections</label>
                            <input id="collection" className="form__checkbox" type="checkbox" name="collection" checked={userInfos.message.allow_collections} />
                        </div>
                        </div>
                        <div className="form--section" >
                            <h4 className="form__section--title">Contact</h4>
                            <div className="form__radio--group">
                                <div className="row">
                                    <div className="form__radio--button">
                                        <label className="form__radio--label" htmlFor="female">F</label>
                                        <input 
                                            id="female" 
                                            className="form--radio" 
                                            type="radio" 
                                            name="gender" 
                                            value="F" 
                                            checked={userInfos.message.gender.trim() === 'F' ? true : false}
                                        />
                                    </div>
                                    <div className="form__radio--button">
                                        <label className="form__radio--label" htmlFor="male">M</label> 
                                        <input id="male" 
                                               className="form--radio"
                                               type="radio" 
                                               name="gender" 
                                               value="M" 
                                               checked={userInfos.message.gender.trim() === 'M' ? true : false}
                                        />
                                    </div>
                                    <div className="form__radio--button">
                                        <label className="form__radio--label" htmlFor="other">Autre</label> 
                                        <input id="other" 
                                               className="form--radio"
                                               type="radio" 
                                               name="gender" 
                                               value="other" 
                                               checked={userInfos.message.gender === 'other' ? true : false}
                                        />
                                    </div>
                                </div>
                            </div>
                            <input id="firstname"
                                   ref={firstnameInput} 
                                   className="form--input" 
                                   type="text"
                                   placeholder="firstname" 
                                   value={userInfos.message.firstname}
                            />
                            <input id="lastname"
                                   ref={lastnameInput} 
                                   type="text" 
                                   className="form--input" 
                                   placeholder="lastname" 
                                   value={userInfos.message.lastname}
                            />
                            <input id="username"
                                   ref={usernameInput} 
                                   type="text" 
                                   className="form--input" 
                                   placeholder="username" 
                                   value={userInfos.message.username}
                            />
                            <input id="email"
                                   ref={emailInput} 
                                   type="email" 
                                   className="form--input" 
                                   placeholder="email" 
                                   value={userInfos.message.email}
                            />
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
