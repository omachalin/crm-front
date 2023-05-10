import './App.css';
import { AuthContext } from './context';
import AppRouter from './route/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

function App() {
  const [isAuth, setIsAuth] = useAuth()

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth
    }}>
      {/* {<UseCheckAuth />} */}
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  )
}
export default App;
