//vendors
import {orderBy, sortBy} from 'lodash';

//hooks
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

//components
import Header from '../../components/heading';
import Loader from '../../components/Loader';
import Member from '../../components/member';
import Popup from '../../components/popup';
import {CgMenuCheese} from 'react-icons/cg';
import {RiLoader3Line} from 'react-icons/ri';
import {FiLoader} from 'react-icons/fi';
import {HiOutlineUserCircle} from 'react-icons/hi';

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
        type: "get",
        page:1,
        limit: 20,
        count: 0,
        success: [],
        error: {}
    })
    const [popupOpen, setPopupOpen] = useState(false);
    const [formState, setFormState] = useState({
        classifyBy: 'username',
        sens: 'asc'
    });

    const [scrollTop, setScrollTop] = useState(false);


    //hooks
    let [loading, setIsLoading, setRef, parentRef] = useInfiniteScroll();

    //handlers
    const handleFilterClick = function(){
        setPopupOpen(true);
    }

    const handleFormClick = function(e){
        e.stopPropagation()
        if(e.target.value){
            return setFormState({
                ...formState,
                classifyBy: e.target.name === 'rank' ? e.target.value : formState.classifyBy,
                sens: e.target.name === 'sens' ? e.target.value : formState.sens 
            })
        }

        if(e.target.id === "valid"){
            parentRef.current.scrollTo(0,0)
            return setUsers({
                ...users,
                page:1
            });
        }

        if(e.target.id === "reset"){
            
            setFormState({
                ...formState,
                classifyBy: 'username',
                sens: 'asc'
            })

            return setUsers({
                ...users,
                pending: true,
                type: "reset",
                success:[]
            });
        }   
    }

    useEffect(async () => {
        let response = '';
        
        response = await getAllUsers({page: users.page, size: users.limit});

        if(response.code === 200){
            if(pageLoading){
                setPageLoading(false);
            }
            if(popupOpen){
                setPopupOpen(false);
            }

            if(loading){
                setIsLoading(false);
            }
            

            if(users.page === 1){
                return setUsers({
                    ...users,
                    pending: false,
                    count: response.message[0],
                    success: [...response.message[1]],
                    error: {}
                })
            }

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

        if(loading && (users.success.length < users.count)){
            return setUsers({...users, page: users.page + 1})
        }
        
        if(loading && users.success.length === users.count){
            return setIsLoading(false);
        }

    },[loading])

    return !pageLoading ?
            <div className="gamers__page page">
                <Header>
                    <Header.Logo url={kingdomsDatas[0].icon_url} alt="Logo 7fallen"/>
                    <Header.Filter icon={CgMenuCheese} onClick={handleFilterClick}/>
                </Header>
                <Popup isOpen={popupOpen} onClick={handleFormClick}>
                    <div className="popup__container">
                        <Popup.Title text="CLASSEMENT"/>
                        <Popup.Group>
                            <Popup.Label data-value="id" htmlFor="id">
                                <Popup.Text text="CLASSER PAR ID"/>
                            </Popup.Label>
                            <Popup.InputRadio id="id" name="rank" checked={formState.classifyBy === 'id'} value="id"/>
                        </Popup.Group>
                        <Popup.Group>
                            <Popup.Label data-value="username" htmlFor="username">
                                <Popup.Text text="CLASSER PAR NOM"/>
                            </Popup.Label>
                            <Popup.InputRadio id="username" name="rank" checked={formState.classifyBy === 'username'} value="username"/>
                        </Popup.Group>
                        <Popup.Group>
                            <Popup.Label data-value="subscribe" htmlFor="subscribe">
                                <Popup.Text text="CLASSER PAR DATE D'INSCRIPTION"/>
                            </Popup.Label>
                            <Popup.InputRadio id="subscribe" name="rank" checked={formState.classifyBy === 'subscribe'} value="subscribe"/>
                        </Popup.Group>
                    </div>
                    <div className="popup__container">
                        <Popup.Title text="SENS"/>
                        <Popup.Group>
                            <Popup.Label data-value="desc" htmlFor="desc">
                                <Popup.Text text="DESCENDANT"/>
                            </Popup.Label>
                            <Popup.InputRadio id="desc" name="sens" checked={formState.sens === 'desc'} value="desc" />
                        </Popup.Group>
                        <Popup.Group>
                            <Popup.Label data-value="asc" htmlFor="asc">
                                <Popup.Text text="ASCENDANT"/>
                            </Popup.Label>
                            <Popup.InputRadio id="asc" name="sens" checked={formState.sens === 'asc'} value="asc"/>
                        </Popup.Group>
                    </div>
                    <Popup.Group>
                        <Popup.Button id="valid" text="VALIDER" />
                        <Popup.Button id="reset" text="RESET" />
                    </Popup.Group>
                </Popup>
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
