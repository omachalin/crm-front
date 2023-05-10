import axios from "axios";
import AuthStore from "./AuthStore";

export class Auth {
  static timeout = null;
  static statusToken = null;

  static async refreshTokens(refreshToken) {
    this.statusToken = 'loading'
    const response = await axios.post('/token-refresh/', {
      refresh: refreshToken,
    });

    this.statusToken = null
    AuthStore.setTokens(response.data.access, response.data.refresh)
  }

  static setTimeout() {
    if (this.statusToken === 'loading') return
    if (this.timeout) clearTimeout(this.timeout)
    if (AuthStore.refresh_token && AuthStore.expires_refresh - Date.now() > 0) {
      const time = AuthStore.expires_access - Date.now()
      this.timeout = setTimeout(() => Auth.refreshTokens(AuthStore.refresh_token), time);
    }
  }
}