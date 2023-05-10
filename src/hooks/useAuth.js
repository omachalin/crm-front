import { useEffect, useState } from "react";
import AuthStore from "../API/AuthStore";
import { Auth } from "../API/Auth";

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState()

  AuthStore.setChangeTokenshandler((accessToken, refreshToken) => {
    if (!refreshToken) return;
    Auth.setTimeout()
  })
  AuthStore.getTokens()

  useEffect(() => {
    if (AuthStore.expires_refresh - Date.now() < 0) {
      AuthStore.clear()
      setIsAuth(false)
    }
  }, [])

  return [isAuth, setIsAuth];
}