import './loginForm.css'
import {Link} from 'react-router-dom'

function loginForm() {

    const handleSubmit= () => {
        fetch('https://test-seven.site/api',{
            method: 'POST',
            mode: 'cors',
        })
        .then((res) => {
            console.log(res.json())
        }).catch() 
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2 className="form--title">Login et mot de passe :</h2>
            <input className="form--input" id="email" name="email" type="text" placeholder="Taper votre email ..."></input>
            <input id="password" className="form--input" name="password" type="password" placeholder="Password ..."></input>
            <label htmlFor="remember" className="remember"><input id="remember" className="remember__checkbox" type="checkbox" name="remember"/>Se souvenir de moi </label>
            {/*<Link className="form--link" to="/subscribe">inscrivez-vous</Link>*/}           
            <button className="btn btn-success" type="submit">Envoyer</button>

        </form>
    )
}

export default loginForm;
