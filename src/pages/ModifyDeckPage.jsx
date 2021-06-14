import Main from '../layouts/Main';

function ModifyDeckPage(props){
    const id = props.location.deckProps.id;
    return (
        <Main classes="page__deck">
            <p>{id}</p>
        </Main>
    )
}

export default ModifyDeckPage;