//hooks
import {useEffect, useState, useRef} from 'react';
import {Link} from 'react-router-dom';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

//components
import Header from '../../components/heading';
import Loader from '../../components/Loader';
import Member from '../../components/member';
import Popup from '../../components/popup';
import Form from '../../components/form';
import List from '../../components/list';
import {GoSettings} from 'react-icons/go';
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
        search: '',
        classifyBy: 'username',
        sens: 'asc'
    });

    //hooks
    let [loading, setIsLoading, setRef, parentRef] = useInfiniteScroll();

    //refs
    const inputSearchRef = useRef();

    //handlers
    const handleFilterClick = function(){
        setUsers({
            ...users,
            type:'filter'
        }) 
    }

    const handleSearchChange = function(e){
        if(!inputSearchRef.current.value){
            setUsers({
                ...users,
                page:1,
                type: 'change'
            })
        }
    }

    const handleSearchClick = function(e){
        e.stopPropagation();
        setUsers({
            ...users,
            type: 'search',
            page:1
        })
    }

    const handleFormClick = function(e){
        e.stopPropagation()

        if(e.target.value){
            setFormState({
                classifyBy: e.target.name === 'rank' ? e.target.value : formState.classifyBy,
                sens: e.target.name === 'sens' ? e.target.value : formState.sens
            });
        }       

        if(e.target.id === "valid"){
            return setUsers({
                ...users,
                page: 1,
                type: "valid"
            })
        }

        if(e.target.id === "reset"){
            return setUsers({
                ...users,
                type: "reset",
                page: 1
            });
        }   
    }

    useEffect(() => {

        if(users.type !== 'get'){
            parentRef.current.scrollTo(0,0);
        }

        if(users.type === 'filter'){
            setPopupOpen(true);
            return setFormState({
                ...formState,
                search: '',
                classifyBy: 'username',
                sens: 'asc'
            })
        }

        if(users.type === 'valid'){
            setPopupOpen(false);
        }

        if(users.type === 'reset'){
            setPopupOpen(false)
            inputSearchRef.current.value = '';
            return setFormState({
                ...formState,
                search: '',
                classifyBy: 'username',
                sens: 'asc'
            })
        }

        if(users.type === 'change'){
            return setFormState({
                search: '',
                classifyBy: 'username',
                sens: 'asc'
            })
        }

        if(users.type === 'search' && inputSearchRef.current.value){
            return setFormState({
                search: inputSearchRef.current.value,
                classifyBy: 'username',
                sens: 'asc'
            })
        }
    },[users.type])

    useEffect(async () => {
        let response = '';
        let options = {}

        if(users.type === 'get' || users.type === 'valid' || users.type === 'reset'){
            options = {
                page: users.page,
                size: users.limit,
                order_by: formState.classifyBy !== 'username' && formState.classifyBy,
                sens: formState.sens !== 'asc' && formState.sens
            }
        }

        if(formState.search){
            options = {
                page: users.page,
                size: users.limit,
                search: formState.search,
                order_by: 'username',
                sens: 'asc'
            }
        }

        response = await getAllUsers(options);

        if(response.code === 200){
            
            if(pageLoading){
                setPageLoading(false);
            }

            if(loading){
                setIsLoading(false);
            }
            

            if(users.page === 1){
                return setUsers({
                    ...users,
                    pending: false,
                    type: 'get',
                    count: response.message[0],
                    success: [...response.message[1]],
                    error: {}
                })
            }

            return setUsers({
                ...users,
                pending: false,
                type: 'get',
                count: response.message[0],
                success: [...users.success, ...response.message[1]],
                error: {}
            })
        }
    },[
        users.page,
        formState
    ])

    useEffect(() => {

        if(loading && (users.success.length < users.count)){
            return setUsers({...users, page: users.page + 1})
        }else{
            return setIsLoading(false);
        }

    },[loading])

    return !pageLoading ?
            <div className="gamers__page page">
                <Header>
                    <Header.Logo url={kingdomsDatas[0].icon_url} alt="Logo 7fallen"/>
                    <Header.Filter icon={GoSettings} onClick={handleFilterClick}/>
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
                            <Popup.Label data-value="created_at" htmlFor="created_at">
                                <Popup.Text text="CLASSER PAR DATE D'INSCRIPTION"/>
                            </Popup.Label>
                            <Popup.InputRadio id="created_at" name="rank" checked={formState.classifyBy === 'created_at'} value="created_at"/>
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
                <Form>
                    <Form.Group>
                        <Form.Search 
                            ref={inputSearchRef} 
                            onClick={handleSearchClick} 
                            onChange={handleSearchChange} 
                            placeholder="SEARCH ..."
                        />
                    </Form.Group>
                </Form>
                <List ref={setRef}>
                    {(!users.pending && users.success.length > 0) ?
                        users.success.map(elmt => {
                            return (
                                <List.Item>
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
                                        <Member.Text text={"ID : " + elmt.id} />
                                        <Member.Text text={elmt.created_at.substring(0, elmt.created_at.indexOf("T"))}/>
                                    </Link>
                                </List.Item>
                            )
                        })
                        :
                        null
                    }
                    {loading && <div className="loader__box"><FiLoader className="loader"/></div>}
                </List>
            </div>
        :
            <Loader loaderIcon={RiLoader3Line}/>
    ;
}

export default GamersPage;
