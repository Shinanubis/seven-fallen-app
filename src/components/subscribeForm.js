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
            <input id="email" className="subscribe__form--input"  name="email" type="email" placeholder="Taper votre email ..." onChange={handleChange} onBlur={handleBlur} value={formValues.email} />
            <input id="username" className="subscribe__form--input" name="username" type="username" placeholder="Tapez votre username " onChange={handleChange} onBlur={handleBlur} value={formValues.username}/>
            <button className="btn btn-success" type="submit"  onClick={handleClick}>Valider</button>
            {checkForm(formValues)}
        </form>
    )
}

export default SubscribeForm;