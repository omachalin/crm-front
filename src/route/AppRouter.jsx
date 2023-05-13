import { publicRoutes, privateRoutes } from './links.js'
import { Route, Routes } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/index.js';
import ResponsiveAppBar from '../components/Navbar/navbar.jsx';
import AuthStore from '../API/AuthStore.js';
//import { ProtectedRoute } from '../components/unautorization/redirect.jsx'

const AppRouter = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext)
  const [routes, setRoutes] = useState({})

  useEffect(() => {
    if (isAuth !== undefined) {
      if (isAuth) {
        setRoutes(privateRoutes)
      } else {
        setRoutes(publicRoutes)
      }
    }
  }, [isAuth]);

  useEffect(() => {
    const token = AuthStore.access_token;
    if (token) {
      setIsAuth(true)
    } else if (window.location.pathname !== '/login') {
      setIsAuth(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const get = () => {
    if (Object.values(routes).length !== 0) {
      return (
        <div>
          <ResponsiveAppBar pages={routes} />
          <Routes>
            {
              routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.component}
                  //element={<ProtectedRoute isAuth={isAuth} path={route.path}>{route.component}</ProtectedRoute>}
                  exact={route.exact}
                />
              ))
            }
          </Routes>
        </div>
      )
    }
  }

  return (
    <>
      {get()}
    </>
  )
}

export default AppRouter