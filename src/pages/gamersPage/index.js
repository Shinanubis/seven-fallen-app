//hooks
import {useEffect, useState} from 'react';

//components
import Header from '../../components/heading';
import {CgMenuCheese} from 'react-icons/cg';
import {RiLoader3Line} from 'react-icons/ri';
import {HiOutlineUserCircle} from 'react-icons/hi';
import Loader from '../../components/Loader';
import Member from '../../components/member';

//settings
import kingdomsDatas from '../../settings/kingdom';

//styles
import './gamerspage.css';

//api
import{getAllUsers} from '../../api/Users'

function GamersPage(props) {
    //states
    const [pageLoading, setPageLoading] = useState(true);
    const [users, setUsers] = useState({
        pending: true,
        success: [],
        error: {}
    })

    useEffect(async () => {
        let response = await getAllUsers();
        if(response.code === 200){
            setPageLoading(false)
            return setUsers({
                pending: false,
                success: [...response.message],
                error: {}
            })
        }
        
    },[])

    return !pageLoading ?
            <div className="gamers__page page">
                <Header>
                    <Header.Logo url={kingdomsDatas[0].icon_url} alt="Logo 7fallen"/>
                    <Header.Filter icon={CgMenuCheese} />
                </Header>
                <h1 className="title">LISTE DES JOUEURS</h1>
                <ul className="gamers__list">
                    {console.log(users.success.length > 0)}
                    {users.success.length > 0 ?
                        users.success[1].map( elmt => {
                            return (
                                    <Member classes="gamers__list--item" variant="li">
                                        {elmt.avatar ?
                                            <Member.Avatar 
                                                url={"/avatars" + elmt.avatar}
                                                alt="user image"
                                            />
                                            :
                                            <div className="member__avatar">
                                                <HiOutlineUserCircle className="default"/>
                                            </div>
                                        }
                                        <Member.Text text={elmt.username} />
                                        <Member.Text text={elmt.created_at.substring(0, elmt.created_at.indexOf("T"))}/>
                                    </Member>
                            )
                        })
                        :
                        null
                    }
                </ul>
            </div>
        :
            <Loader loaderIcon={RiLoader3Line}/>
    ;
}

export default GamersPage;
