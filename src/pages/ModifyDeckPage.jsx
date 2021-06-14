import Main from '../layouts/Main';

function ModifyDeckPage(props){
    
    return (
        <Main classes="page__deck">
            <p>{props.location.deckProps}</p>
        </Main>
    )
}

export default ModifyDeckPage;