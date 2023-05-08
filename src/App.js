import { useState } from 'react';
import './App.css';
import { AuthContext } from './context';
import AppRouter from './route/AppRouter';
import { UseCheckAuth } from './/hooks/CheckAuth';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const [isAuth, setIsAuth] = useState()
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
