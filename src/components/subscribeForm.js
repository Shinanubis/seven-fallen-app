import {useState} from 'react'
import './subscribeForm.css'


function SubscribeForm() {
    const [formValues, setValue] = useState({
        email:'',
        firstname:'',
        lastname:'',
        password:'',
        repassword:''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleChange = (e) => {
        e.preventDefault()
        const {id,value} = e.target
        setValue({...formValues,[id]:value})
    }

    const handleBlur = (e) => {
        e.preventDefault()
        const {id,value} = e.target
        setValue({...formValues,[id]:value})
    }

    return (
        <form className="form">
            <h2 className="form--title">Inscription :</h2>
            <input id="email" className="form--input"  name="email" type="text" placeholder="Taper votre email ..." onChange={handleChange} onBlur={handleBlur} value={formValues.email}></input>
            <input id="firstname" className="form--input"  name="firstname" type="text" placeholder="Taper votre prénom ..." onChange={handleChange} onBlur={handleBlur} value={formValues.firstname}></input>
            <input id="lastname" className="form--input"  name="lastname" type="text" placeholder="Taper votre nom ..." onChange={handleChange} onBlur={handleBlur} value={formValues.lastname}></input>
            <input id="password" className="form--input" name="password" type="password" placeholder="Taper votre mot de passe ..." onChange={handleChange} onBlur={handleBlur} value={formValues.password}></input>
            <input id="repassword" className="subscribe__form--input" name="repassword" type="password" placeholder="Retaper votre mot de passe ..." onChange={handleChange} onBlur={handleBlur} value={formValues.repassword}></input>
            <button className="btn btn-success" type="submit" onSubmit={handleSubmit}>Valider</button>
        </form>
    )
}

export default SubscribeForm;