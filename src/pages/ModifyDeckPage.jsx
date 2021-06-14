import Main from '../layouts/Main';

function ModifyDeckPage(props){
    return (
        <Main classes="page__deck column justify-center align-center">
            <p>{props.location.deckProps.id}</p>
        </Main>
    )
}

export default ModifyDeckPage;