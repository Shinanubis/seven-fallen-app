//vendors
import {orderBy, sortBy} from 'lodash';

//hooks
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

//components
import Header from '../../components/heading';
import {CgMenuCheese} from 'react-icons/cg';
import {RiLoader3Line} from 'react-icons/ri';
import {FiLoader} from 'react-icons/fi';
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
        page:1,
        limit: 20,
        count: 0,
        success: [],
        error: {}
    })

    //hooks
    let [loading, setIsLoading, setRef, parentRef] = useInfiniteScroll();

    //handlers
    const handleFilterClick = function(){
        console.log("hello")
    }

    useEffect(async () => {
        let response = await getAllUsers({page: users.page, size: users.limit});
        if(response.code === 200){
            setPageLoading(false);
            setIsLoading(false);
            return setUsers({
                ...users,
                pending: false,
                count: response.message[0],
                success: [...users.success, ...response.message[1]],
                error: {}
            })
        }
        
    },[users.page])

    useEffect(() => {
        if(loading === true && users.success.length < users.count){
            setUsers({...users, page: users.page + 1})
        }else{
            setIsLoading(false);
        }
    },[loading])

    return !pageLoading ?
            <div className="gamers__page page">
                <Header>
                    <Header.Logo url={kingdomsDatas[0].icon_url} alt="Logo 7fallen"/>
                    <Header.Filter icon={CgMenuCheese} onClick={handleFilterClick}/>
                </Header>
                <h1 className="title">LISTE DES JOUEURS</h1>
                <ul ref={setRef} className="gamers__list">
                    {(!users.pending && users.success.length > 0) ?
                        users.success.map(elmt => {
                            return (
                                <Member classes="gamers__list--item" variant="li">
                                    <Link className="gamers__list--link" to={`/users/${elmt.id}/decks`}>    
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
                                    </Link>
                                </Member>
                            )
                        })
                        :
                        null
                    }
                    {loading && <div className="loader__box"><FiLoader className="loader"/></div>}
                </ul>
            </div>
        :
            <Loader loaderIcon={RiLoader3Line}/>
    ;
}

export default GamersPage;
