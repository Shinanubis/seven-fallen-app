import {useState} from 'react'
import { createUser } from '../api/userApi';
import './SubscribePage.css'


function SubscribePage() {
    const [formValues, setValue] = useState({
        email:'',
        username: ''
    });
    
    const handleChange = (e) => {
        e.preventDefault();
        setValue({...formValues, [e.target.name]:e.target.value});
    };

    const handleBlur = (e) => {
        e.preventDefault();
        setValue({...formValues,[e.target.name]:e.target.value})     
    }

    const handleClick = (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formValues).map((key, index) => {
            return data.append(key,formValues[key]);
        });
        createUser('https://test-seven.site/api/user/subscribe',data);
    }

    return (
        <form className="form">
            <h2 className="form--title">Inscription :</h2>
            <input 
                id="email" 
                className="subscribe__form--input"  
                name="email" 
                type="email" 
                placeholder="Taper votre email ..." 
                onBlur={e => handleBlur(e)} 
                onChange={e => handleChange(e)} 
                value={formValues.email} 
            />
            <input 
                id="username" 
                className="subscribe__form--input" 
                name="username" type="username" 
                placeholder="Tapez votre username " 
                onBlur={e => handleBlur(e)} 
                onChange={e => handleChange(e)} 
                value={formValues.username}
            />
            <button 
                className="btn btn-success" 
                type="submit"  
                onClick={e => handleClick(e)}>
                    Valider
            </button>
        </form>
    )
}

export default SubscribePage;