import React,{useState, useEffect, useRef} from 'react';
import { useParams } from 'react-router-dom';
import { BsPencil } from 'react-icons/bs';

/* api */
import {getProfile, updateProfile, deleteProfile, addAvatar, getAvatar} from '../api/Profile';

/* components */
import { RiLoader3Line } from 'react-icons/ri'
import Button from '../components/Button';
import Main from '../layouts/Main';
import Loader from '../components/Loader';

/* module */
import regexModule  from '../modules/regex';

const ProfileForm = (props) => {
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
    const [avatar, setAvatar] = useState({
        code : 200,
        message : {
            avatar : "https://test-seven.site/images/user-default.svg"
        }
    });
    const [avatarForm, setAvatarForm] = useState();
     
    /* ref */
    const firstnameInput = useRef(null);
    const lastnameInput = useRef(null);
    const usernameInput = useRef(null);
    const emailInput = useRef(null);
    const avatarInput = useRef(null);
    const avatarImage = useRef(null); 

    const handleChange = (e) => {
        e.preventDefault();
        switch(e.target.id){
            case 'firstname':
                if(regexModule.regex_name.test(e.target.value) === true){
                    if(firstnameInput.current.classList.contains('bad__input')){
                        firstnameInput.current.classList.remove('bad__input');
                    }
                    firstnameInput.current.classList.add('good__input');
                }else{
                    if(firstnameInput.current.classList.contains('good__input')){
                        firstnameInput.current.classList.remove('good__input');
                    }
                    firstnameInput.current.classList.add('bad__input');
                }

                if(firstnameInput.current.value.length === 0){
                    firstnameInput.current.classList.remove('good__input');
                }

                setUserInfos(prevState => {
                    let newObj = {...prevState};
                    newObj.message.firstname = e.target.value;
                    return newObj; 
                });
                break;

            case 'lastname':
                if(regexModule.regex_name.test(e.target.value) === true){
                    if(lastnameInput.current.classList.contains('bad__input')){
                        lastnameInput.current.classList.remove('bad__input');
                    }
                    lastnameInput.current.classList.add('good__input');
                }else{
                    if(lastnameInput.current.classList.contains('good__input')){
                        lastnameInput.current.classList.remove('good__input');
                    }
                    lastnameInput.current.classList.add('bad__input');
                }

                if(lastnameInput.current.value.length === 0){
                    lastnameInput.current.classList.remove('good__input');
                }
                setUserInfos(prevState => {
                    let newObj = {...prevState};
                    newObj.message.lastname = e.target.value;
                    return newObj; 
                });
                break;
            case 'username':
                if(regexModule.regex_username.test(e.target.value) === true){
                    if(usernameInput.current.classList.contains('bad__input')){
                        usernameInput.current.classList.remove('bad__input');
                    }
                    usernameInput.current.classList.add('good__input');
                }else{
                    if(usernameInput.current.classList.contains('good__input')){
                        usernameInput.current.classList.remove('good__input');
                    }
                    usernameInput.current.classList.add('bad__input');
                }

                if(usernameInput.current.value.length === 0){
                    usernameInput.current.classList.remove('good__input');
                }
                setUserInfos(prevState => {
                    let newObj = {...prevState};
                    newObj.message.username = e.target.value;
                    return newObj; 
                });
                break;
            case 'email':
                if(regexModule.regex_email.test(e.target.value) === true){
                    if(emailInput.current.classList.contains('bad__input')){
                        emailInput.current.classList.remove('bad__input');
                    }
                    emailInput.current.classList.add('good__input');
                }else{
                    if(emailInput.current.classList.contains('good__input')){
                        emailInput.current.classList.remove('good__input');
                    }
                    emailInput.current.classList.add('bad__input');
                }

                if(emailInput.current.value.length === 0){
                    emailInput.current.classList.remove('good__input');
                }
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

            case 'avatar' :
                if(e.target.files.length > 1){
                    alert("Can send only one file");
                }

                if(e.target.files[0].size > 200000){
                    alert("file too big");
                }

                if(e.target.files[0].type !== "image/png" && e.target.files[0].type !== "image/jpeg"){
                    alert("bad file type should be png or jpg");
                }
                let form = new FormData();     
                form.append('avatar', e.target.files[0]);
                setAvatarForm(form);
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

    const handleAvatarClick = (e) => {
        e.preventDefault();
        avatarInput.current.click();    
        return true;
    }

    const handleDeleteClick = async (e) => {
        e.preventDefault();
        let response = "";
        let test = window.confirm("Are you sure ?");
        if(test === true){
            response = await deleteProfile();
            if(response.code === 200){
                setUserInfos(response)
            }
        }else{
            alert("Ouff ...");
        }

        return true;
    }

    useEffect(async () => {
        if(avatarForm){
            let response = await addAvatar(avatarForm);
            if(response.code === 200){
                setAvatar(response);
            }
        }
    }, [avatarForm]);

    useEffect(async () => {
        let responseUser = await getProfile();
        let responseAvatar = await getAvatar();

        if(responseAvatar.code === 200){
            setAvatar(responseAvatar);
        }

        if(responseUser.code === 200){
            setUserInfos(responseUser);
        }
        console.log(avatar.message.avatar)
    },[]);

    return isLoaded === true ? (
        <Main classes="profile__page"> 
                <form className="form" onChange={handleChange}>
                        <label className="form__label--avatar mb-4" htmlFor="avatar">
                            <div className="profile__heading" onClick={handleAvatarClick}>
                                {avatar.message ? <img className="profile__avatar"
                                     ref={avatarImage}
                                     src={avatar.message.avatar ? avatar.message.avatar : avatar.message.avatar} 
                                     alt="avatar"
                                />
                                :
                                null}
                                <BsPencil className="profile__avatar--button"/>
                            </div>
                        </label>
                        <input ref={avatarInput} 
                               id="avatar" 
                               className="d-none" 
                               name="avatar" 
                               type="file" 
                               accept="image/png, image/jpeg"
                        />
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
                        <Button classes="btn" text="update" bgcolor='#3be73b' color='#202020' onClick={handleClick}/>
                        <Button classes="btn" text="delete" bgcolor='#ff5d5d' color='#202020' onClick={handleDeleteClick}/>  
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
