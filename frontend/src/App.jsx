import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { NotFound } from './pages/NotFound';
import { Main } from './components/Main';

const App = () => {
    return (
        <>
        <Main>
        <Router>
           <Routes>
               <Route exact path="/" element={
                   <HomePage />
               }
               />
               <Route path='/login' element={<LoginPage />}/>
               <Route path='*' element={<NotFound />} />
           </Routes>
        </Router>
        </Main>
        </>
    )
}

export default App;
