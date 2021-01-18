import './subscribeForm.css'

function SubscribeForm() {
    return (
        <form className="form">
            <h2 className="form--title">Inscription :</h2>
            <input className="form--input" id="email" name="email" type="text" placeholder="Taper votre email ..."></input>
            <input className="form--input" id="firstname" name="firstname" type="text" placeholder="Taper votre prénom ..."></input>
            <input className="form--input" id="firstname" name="firstname" type="text" placeholder="Taper votre nom ..."></input>
            <input id="password" className="form--input" name="password" type="password" placeholder="Taper votre mot de passe ..."></input>
            <input id="repassword" className="subscribe__form--input" name="repassword" type="password" placeholder="Retaper votre mot de passe ..."></input>
            <button className="btn btn-success" type="button">Valider</button>
        </form>
    )
}

export default SubscribeForm;