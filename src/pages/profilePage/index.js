import React,{useState, useEffect, useRef} from 'react';
import { BsPencil } from 'react-icons/bs';

/* api */
import {getProfile, updateProfile,deleteProfile} from '../../api/Profile';

/* components */
import { RiLoader3Line } from 'react-icons/ri';
import {BiTrashAlt} from 'react-icons/bi';
import ToolBox from '../../components/toolbox';
import Loader from '../../components/Loader';
import Header from '../../components/heading';
import Form from '../../components/form';
import Avatar from '../../components/avatar';
import ImageLoader from '../../components/imageLoader';
import Popup from '../../components/popup';
import Flash from '../../components/flashMessage';

//css
import './ProfilePage.css';

//datas import
import kingdomsDatas from "../../settings/kingdom";

//utilities
import {debounce} from "lodash";
import mod from '../../utilities/utils';
import dotenv from 'dotenv';
dotenv.config();

const ProfilePage = (props) => {

    //states
    const [pageLoading, setPageLoading] = useState(true);
    const [user, setUser] = useState({
        pending: true,
        type: "",
        filename: "",
        success: {},
        error: {}
    });
    const [flash, setFlash] = useState({
        success: '',
        error: ''
    })
    const [confirmPopup, setConfirmPopup] = useState({
        isOpen: false,
        action: null
    })

    //refs
    const inputRef = useRef();
    const avatarRef = useRef();
    const linkRef = useRef();

    //handlers
    const handleInputValue = debounce(function(text){
            setUser({
                ...user,
                success: {...user.success, username: text}
            })
    },300)

    const handleUpload = function(e){
        try{

            if(!window.File || !window.FileReader || !window.FileList || !window.Blob){
                throw{
                    message: "Your browser is too old to support HTML5 File API"
                }
            }

            let reader = new FileReader();
            let file = e.target.files[0];

            if(!mod.checkFileSize(file.size, 1000000)){
                throw {
                    message: "Excessive file size max 1MB..."
                }
            }
            
            if(!mod.checkMimeType(file.type, ["image/jpeg", "image/png"])){
                throw {
                    message: "Should be jpeg or png ..."
                }
            }

            if(!mod.checkFileExt(file.name, ["jpg","jpeg","png", "JPG", "JPEG", "PNG"])){
                throw {
                    message: "Bad file extension should be jpg, jpeg, or png ..."
                }
            }

            reader.addEventListener('load', function(e){
                setUser({
                    ...user,
                    type:"image",
                    file,
                    success: {...user.success, avatar: e.target.result}
                })
            })

            reader.addEventListener('error', function(e){
                throw {
                    message: `An error occured during the file reading : ${file.name}`
                }
            })

            reader.readAsDataURL(file)
        }catch(e){
            alert(e.message)
        }
    }

    const handlePopupClick = function(e){
        if(e.target.id === "confirm"){
            return setConfirmPopup({
                ...confirmPopup,
                isOpen: false,
                action: e.target.id
            })
        }

        if(e.target.id === "cancel"){
            return setConfirmPopup({
                ...confirmPopup,
                isOpen: false,
                action: null
            })
        }
    }

    const handleClick = debounce(function(e){
       switch(e.target.id){
           case "update":
                return setUser({
                    ...user,
                    pending: true,
                    type: "update"
                });
            case "delete":
                setConfirmPopup({
                    ...confirmPopup,
                    isOpen: true
                })
                return setUser({
                    ...user,
                    pending: true,
                    type: "delete"
                });
            default: 
                return setUser({...user});
       }
    }, 400)

    const logout = function(){
        linkRef.current.click();
    }

    useEffect(async () => {
        let response = '';
        if(user.pending){
            switch(user.type){
                case "update":
                    response = await updateProfile({username: user.success.username, avatar: user.file});
                    if(response.code === 200){
                        setFlash({
                            ...flash,
                            success: "Updated successfully",
                            error: ""
                        })
                        return setUser({
                            ...user,
                            pending: false,
                            success: {...response.message}
                        })
                    }
                case "delete":
                    setUser({
                        ...user,
                        pending: false
                    })
                    return setConfirmPopup({
                        ...confirmPopup,
                        isOpen: true
                    })
            }
        }
    },[user.pending])

    useEffect(() => {
        console.log(user)
    },[user])

    useEffect(async () => {
        let response = '';
        if(!confirmPopup.isOpen && confirmPopup.action === "confirm"){
            response = await deleteProfile();
            if(response.code === 200){
                return setFlash({
                     ...flash,
                     error: '',
                     success: response.message
                })
            }else{
                return setFlash({
                     ...flash,
                     success:'',
                     error: response.message
                }) 
            }
        }
    },[confirmPopup])

    useEffect(async () => {
        let responseUser = await getProfile();
        if(responseUser.code >= 200 && responseUser.code <= 299){
            setPageLoading(false)
            inputRef.current.value = responseUser.message.username;
            setUser({
                pending: false,
                type:"get",
                success: {...responseUser.message},
                error: {},
            })
        }else{
            setUser({
                pending: false,
                success: {},
                error: {...responseUser.message}
            })
        }
    },[]);

    return  !pageLoading ?
                <div className="profile__page page">
                    <Header>
                        <Header.Logo url={kingdomsDatas[0].icon_url} alt="Logo 7fallen"/>
                    </Header>
                    <Flash 
                        error={flash.error} 
                        success={flash.success} 
                        setFlash={setFlash}
                        redirect={user.type === "delete"}
                        redirectCallback={logout} 
                    />
                    <div className="avatar__block">
                        <Form.Label htmlFor="avatar__upload">
                            {
                                user.type === "image" &&
                                    <Avatar 
                                        url={user.success.avatar} 
                                        alt="user image"
                                    />
                            }
                            {
                                user.pending === true &&
                                user.type === "update" &&
                                    <Loader loaderIcon={RiLoader3Line}/>
                            }
                            {
                                ((user.type === "delete" && user.pending === false) ||
                                (user.type === "update" && user.pending === false)) &&  
                                    <Avatar 
                                        url={user.success.avatar && "/avatars" + user.success.avatar} 
                                        alt="user image"
                                    />
                            }
                            {
                                user.type === "get" &&
                                    <Avatar 
                                        url={user.success.avatar && process.env.REACT_APP_AVATAR_STATIC + "/" + user.success.avatar} 
                                        alt="user image"
                                    />
                            }
                            <Form.File 
                                id="avatar__upload" 
                                classes="d-none"
                                onChange={handleUpload} 
                            />
                        </Form.Label>
                        <p className="user__id">ID : {user.success.id}</p>
                    </div>
                    <Form>
                        <Form.Text
                            ref={inputRef}
                            placeholder="Pseudo discord"
                            onChange = {handleInputValue}
                            debounceTime = {150}
                        />
                    </Form>
                    <Popup isOpen={confirmPopup.isOpen} onClick={handlePopupClick}>
                        <Popup.Text 
                            text="Etes-vous certain de vouloir supprimer votre compte ? 
                                  Cette action est irreversible et tous vos decks seront 
                                  supprimés de la base de données."
                        />
                        <Popup.Group>
                            <Popup.Button id="confirm" text="confirmer"/>
                            <Popup.Button id="cancel" text="annuler"/>
                        </Popup.Group>
                    </Popup>
                    <ToolBox onClick={handleClick}>
                        <ToolBox.Content>
                            <ToolBox.Row>
                                <ToolBox.Action 
                                    id="update" 
                                    isLoading={user.pending && user.type === "update"} 
                                    text="mettre a jour"
                                />
                                <ToolBox.Action 
                                    id="delete" 
                                    icon={BiTrashAlt}
                                />
                            </ToolBox.Row>
                        </ToolBox.Content>
                    </ToolBox>
                    <a ref={linkRef} className="d-none" href={process.env.REACT_APP_BASE_URL + "/api/auth/logout"}></a>
                </div>
                :
                <Loader loaderIcon={RiLoader3Line}/>
    ;
}

export default ProfilePage;
