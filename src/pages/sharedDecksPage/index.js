//hooks
import {useEffect, useState, useRef, useContext} from 'react';
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
import './shareddeckspage.css';

//api
import{getAllDecks} from '../../api/Decks';

//contexts imports
import {SessionContext} from '../../contexts/SessionContext';

//utilities
import {debounce} from 'lodash';

function SharedDecksPage(props) {

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
        kingdoms: [],
        divinity: '',
        classifyBy: 'deck_name',
        sens: 'asc'
    });
    const [dataList, setDataList] = useState({
        divinityList: [],
        value: ''
    });

    //context
    const [session, setLang] = useContext(SessionContext);

    //hooks
    let [loading, setIsLoading, setRef, parentRef] = useInfiniteScroll();

    //refs
    const inputSearchRef = useRef();

    //utils
    const searchTyping = debounce(function(regex, text, toCompare, field, state, fieldState, cb){
        let result = toCompare.filter(elmt => regex.test(elmt[field]) === true);
        if(text === ''){
            return cb({
                ...state,
                [fieldState]: []
            });
        }
        return cb({
            ...state,
            [fieldState]: [...result]
        });
    },100)

    //handlers
    const handleFilterClick = function(){
            setPopupOpen(true);
            inputSearchRef.current.value = '';
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
        e.stopPropagation();
        if(e.target.id === 'valid'){
            return setUsers({
                ...users,
                pending: true,
                type: "valid"
            });
        }

        if(e.target.id === 'reset'){
            setFormState({
                search: '',
                kingdoms: [],
                divinity: '',
                classifyBy: 'deck_name',
                sens: 'asc'
            })
            return setUsers({
                ...users,
                pending: true,
                page: 1,
                type: "reset"
            });
        }     
    }

    const handleDivinitieChoice = function(id){
        return setFormState({
            ...formState,
            divinity: id
        })
    }

    const handleFiltersChange = (e) => {
        if(e.target.name === 'sens'){
            return setFormState({
                ...formState,
                sens: e.target.value 
            });
        }
        
        if(e.target.name === 'rank'){
            return setFormState({
                ...formState,
                classifyBy: e.target.value 
            });
        }

        if(e.target.name === 'kingdom'){
            if(formState.kingdoms.includes(e.target.value)){
                let newArr = [...formState.kingdoms];
                newArr.splice(newArr.findIndex(elmt => elmt === e.target.value),1);
                return setFormState({
                    ...formState,
                    kingdoms: [...newArr]
                });    
            }
            return setFormState({
                ...formState, 
                kingdoms: [...formState.kingdoms, e.target.value]
            });
        }

        if(e.target.name === "divinity"){
            let term = '^' + e.target.value;
            let rx = new RegExp(term,'i');
            searchTyping(
                rx, 
                e.target.value, 
                session.divinities, 
                'name', 
                dataList,
                'divinityList',
                setDataList
            );
        }
    };

    useEffect(async () => {
        if(users.pending === false){
            return;
        }
        let response = '';
        let options = {
            size: users.limit,
            page: users.page,
            order_by: formState.classifyBy,
            sens: formState.sens,
            kingdoms: formState.kingdoms.length > 0 && [...formState.kingdoms],
            divinity: formState.divinity
        };
        console.log('options : ', options)
        response = await getAllDecks(options);
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
        users.pending
    ])

    useEffect(() => {

        if(loading && (users.success.length < users.count)){
            return setUsers({...users, page: users.page + 1})
        }else{
            return setIsLoading(false);
        }

    },[loading])

    return !pageLoading ?
            <div className="shared__decks--page page">
                <Header>
                    <Header.Logo url={kingdomsDatas[0].icon_url} alt="Logo 7fallen"/>
                    <Header.Filter icon={GoSettings} onClick={handleFilterClick}/>
                </Header>
                <Popup isOpen={popupOpen} onClick={handleFormClick}>
                    <Form onChange={handleFiltersChange}>
                        <div className="popup__container">
                            <Popup.Title text="FILTRES" />
                            <Form.Group>
                                <Form.Title text="FILTRE PAR ROYAUMES" />
                                <div className="kingdoms__list">
                                    {session.kingdoms.length > 0 &&
                                        session.kingdoms.map(elmt =>{
                                            return (
                                                <>
                                                    <Form.Label 
                                                        classes={
                                                            formState.kingdoms && formState.kingdoms.includes(elmt.id + "") 
                                                            ? 
                                                            "form__label opacity-4" 
                                                            : 
                                                            "form__label"
                                                        } 
                                                        htmlFor={elmt.id}
                                                    >
                                                        <img
                                                            className="kingdom__img"
                                                            src={kingdomsDatas[elmt.id].icon_url}
                                                        />
                                                    </Form.Label>
                                                    <Form.Checkbox
                                                        key={elmt.id} 
                                                        id={elmt.id} 
                                                        classes="d-none" 
                                                        name="kingdom" 
                                                        value={elmt.id} 
                                                    />
                                                </>
                                            )
                                        })
                                    }
                                </div> 
                            </Form.Group>
                            <Form.Group classes="form__group mb-2">
                                <Form.List 
                                    id="divinity"
                                    listId="divinities" 
                                    placeholder="Search by Divinity..."
                                    name="divinity" 
                                    listId="search__list"
                                    dataListItemName="divinity" 
                                    dataList={dataList.divinityList} 
                                    setValue = {handleDivinitieChoice}
                                />
                            </Form.Group>
                        </div>
                        <div className="popup__container">
                            <Popup.Title text="CLASSEMENT"/>
                            <Popup.Group>
                                <Popup.Label htmlFor="id">
                                    <Popup.Text text="CLASSER PAR ID"/>
                                </Popup.Label>
                                <Popup.InputRadio 
                                    id="id" 
                                    name="rank" 
                                    checked={formState.classifyBy === 'id'} 
                                    value="id"
                                />
                            </Popup.Group>
                            <Popup.Group>
                                <Popup.Label htmlFor="deck_name">
                                    <Popup.Text text="CLASSER PAR NOM DE DECKS"/>
                                </Popup.Label>
                                <Popup.InputRadio 
                                    id="deck_name" 
                                    name="rank" 
                                    checked={formState.classifyBy === 'deck_name'} 
                                    value="deck_name"
                                />
                            </Popup.Group>
                            <Popup.Group>
                                <Popup.Label htmlFor="kingdom">
                                    <Popup.Text text="CLASSER PAR ROYAUME"/>
                                </Popup.Label>
                                <Popup.InputRadio 
                                    id="kingdom" 
                                    name="rank" 
                                    checked={formState.classifyBy === 'kingdom'} 
                                    value="kingdom"
                                />
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
                    </Form>
                </Popup>
                <h1 className="title">DECKS PARTAGES PAR LES JOUEURS</h1>
                <Form onChange={handleSearchChange}>
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
                                        {elmt.kingdom ?
                                            <Member.Avatar 
                                                url={kingdomsDatas[elmt.kingdom].icon_url}
                                                alt="user image"
                                            />
                                            :
                                            <div className="member__avatar">
                                                <HiOutlineUserCircle className="default"/>
                                            </div>
                                        }
                                        <Member.Text text={elmt.deck_name} />
                                        <Member.Text text={"ID : " + elmt.id} />
                                        <Member.Text text={elmt.num_cards}/>
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

export default SharedDecksPage;
