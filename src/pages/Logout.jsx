import { useContext, useEffect } from "react"
import axios from "axios";
import { AuthContext } from "../context";

export const LogoutPage = () => {
  const { setIsAuth } = useContext(AuthContext)
  useEffect(() => {
    (async () => {
      try {
        await axios.post('/auth/logout/', {
          refresh_token: localStorage.getItem('refresh_token')
        }, { headers: { 'Content-Type': 'application/json' } }
        );

        localStorage.clear();
        axios.defaults.headers.common['Authorization'] = null;
        setIsAuth(false)
        window.location.href = '/auth'
      } catch (e) {
        console.log('logout not working', e)
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div></div>
  )
}

export default LogoutPage;