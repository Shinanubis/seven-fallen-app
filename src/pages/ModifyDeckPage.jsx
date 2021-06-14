import Main from '../layouts/Main';

function ModifyDeckPage(props){
    
    return (
        <Main classes="page__deck">
            {console.log("test : " , props.location)}
            <p>deck page</p>
        </Main>
    )
}

export default ModifyDeckPage;