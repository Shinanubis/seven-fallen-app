import Main from '../layouts/Main';

function ModifyDeckPage(props){
    const id = props.location.deckProps;
    return (
        <Main classes="page__deck">
            {console.log(id)}
            <p></p>
        </Main>
    )
}

export default ModifyDeckPage;