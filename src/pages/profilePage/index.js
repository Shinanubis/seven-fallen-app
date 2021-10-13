import React,{useState, useEffect, useRef} from 'react';
import { BsPencil } from 'react-icons/bs';

/* api */
import {getProfile, getAvatar} from '../../api/Profile';

/* components */
import { RiLoader3Line } from 'react-icons/ri';
import {BiTrashAlt} from 'react-icons/bi';
import Flash from '../../components/Flash';
import ToolBox from '../../components/toolbox';
import Loader from '../../components/Loader';
import Header from '../../components/heading';
import Form from '../../components/form';
import Avatar from '../../components/avatar';

//css
import './ProfilePage.css';

//datas import
import kingdomsDatas from "../../settings/kingdom";

//utilities
import {debounce} from "lodash";

const ProfilePage = (props) => {

    const [pageLoading, setPageLoading] = useState(true);
    const [user, setUser] = useState({
        pending: true,
        type: "",
        success: {},
        error: {}
    });

    const handleInputValue = debounce(function(text){
            setUser({
                ...user,
                success: {...user.success, username: text}
            })
    },1000)

    const inputRef = useRef();

    const handleClick = function(e){
       switch(e.target.id){
           case "update":
                return setUser({
                    ...user,
                    pending: true,
                    type: "update"
                });
            case "delete":
                return setUser({
                    ...user,
                    pending:true,
                    type: "delete",
                });
            default: 
                return setUser({...user});
       }
    }


    useEffect(() => {
        console.log("user : ", user)
    },[user])

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
                    <div className="avatar__block">
                        <Avatar />
                        <p className="user__id">id : {user.success.id}</p>
                    </div>
                    <Form>
                        <Form.Text
                            ref={inputRef}
                            placeholder="Pseudo discord"
                            onChange = {handleInputValue}
                            debounceTime = {1000}
                        />
                    </Form>
                    <ToolBox onClick={handleClick}>
                        <ToolBox.Content>
                            <ToolBox.Row>
                                <ToolBox.Action id="update" text="mettre a jour"/>
                                <ToolBox.Action id="delete" icon={BiTrashAlt}/>
                            </ToolBox.Row>
                        </ToolBox.Content>
                    </ToolBox>
                </div>
                :
                <Loader loaderIcon={RiLoader3Line}/>
    ;
}

export default ProfilePage;
