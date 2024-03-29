import { useContext, useEffect } from "react"
import fetcher from "../fetcher";
import { AuthContext } from "../context";
import AuthStore from "../API/AuthStore";

export const LogoutPage = () => {
  const { setIsAuth } = useContext(AuthContext)

  useEffect(() => {
    fetcher.post('/auth/logout/', {
      refresh_token: AuthStore.refresh_token,
    }, { headers: { 'Content-Type': 'application/json' } }
    ).then(() => {
      AuthStore.clear();
      setIsAuth(false)
      window.location.href = '/auth'
    })
    .catch((e) => {
      console.log('logout not working', e)
      AuthStore.clear();
      setIsAuth(false)
    })
  })
  return (
    <div></div>
  )
}

export default LogoutPage;