import {useState} from 'react'
import { createUser } from '../api/userApi';
import './subscribeForm.css'


function SubscribeForm() {
    const [counter,setCounter] = useState(0)
    const [formValues, setValue] = useState({
        email:'',
        firstname:'',
        lastname:'',
        password:'',
        repassword:'',
        isValid: ''
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

    const handleClick = (e) => {
        e.preventDefault()
        setCounter(counter + 1)
        if(Object.values(formValues).every(elmt => elmt === '')){
            setValue({...formValues,isValid: ''})
        }else if(Object.values(formValues).some((elmt) => elmt === '')){
            setValue({...formValues,isValid: false })
        }else{
            setValue({...formValues,isValid: true})
            createUser('https://test-seven.site/user/subscribe',formValues)
        }

    }

    const checkForm = (arg) => {

        if(arg.isValid !== ''){

            if(arg.isValid){
                return (
                    <p className="message success">Formulaire envoyé avec succés</p>
                )
            }
            
            if(!arg.isValid ){
                return (
                    <p className="message danger">Echec de l'envoi du formulaire</p>
                )
            }
        }

        if(arg.isValid === '' && counter > 0){
           return <p className="message info">Veuillez remplir tous le champs du formulaire ...</p>
        }


    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2 className="form--title">Inscription :</h2>
            <input id="email" className="subscribe__form--input"  name="email" type="email" placeholder="Taper votre email ..." onChange={handleChange} onBlur={handleBlur} value={formValues.email} ></input>
            <input id="firstname" className="subscribe__form--input"  name="firstname" type="text" placeholder="Taper votre prénom ..." onChange={handleChange} onBlur={handleBlur} value={formValues.firstname} ></input>
            <input id="lastname" className="subscribe__form--input"  name="lastname" type="text" placeholder="Taper votre nom ..." onChange={handleChange} onBlur={handleBlur} value={formValues.lastname} ></input>
            <input id="password" className="subscribe__form--input" name="password" type="password" placeholder="Taper votre mot de passe ..." onChange={handleChange} onBlur={handleBlur} value={formValues.password} ></input>
            <input id="repassword" className="subscribe__form--input" name="repassword" type="password" placeholder="Retaper votre mot de passe ..." onChange={handleChange} onBlur={handleBlur} value={formValues.repassword}></input>
            <button className="btn btn-success" type="submit"  onClick={handleClick}>Valider</button>
            {checkForm(formValues)}
        </form>
    )
}

export default SubscribeForm;