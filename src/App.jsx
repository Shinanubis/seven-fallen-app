import './App.css'
import Nav from './components/navbar';
import Header from'./layouts/Header'
import Main from'./layouts/Main'
import Footer from'./layouts/Footer'
function App() {
  
  return (
    <>
    {console.log(document.getElementById('main'))}
      <Header>
            <Nav/>
      </Header>
      <Main>
      </Main>
      <Footer>
      </Footer>
    </>

  );
}

export default App;