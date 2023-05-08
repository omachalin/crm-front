import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/index.js';

export const UseCheckAuth = () => {
  const { setIsAuth } = useContext(AuthContext)

  const getAuth = () => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsAuth(true)
    } else if (window.location.pathname !== '/login') {
      setIsAuth(false)
    }
  }

  useEffect(() => {
    getAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

}