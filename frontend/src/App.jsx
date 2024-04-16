import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { NotFound } from './pages/NotFound';
import { Main } from './components/Main';

const App = () => {
    return (
        <>
        <Main>
        <Routes>
            <Route exact path="/" element={
                <HomePage />
            }
            />
            <Route path='/login' element={<LoginPage />}/>
            <Route path='*' element={<NotFound />} />
        </Routes>
        </Main>
        </>
    )
}

export default App;
