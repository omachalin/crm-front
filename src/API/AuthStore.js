import API from "./Global";

let expiration_access = 2;
let expiration_refresh = 5;

// eslint-disable-next-line no-unused-expressions
API.getSettings('auth', (data) => {
  expiration_access = data[	'access_token_expiration_time']
  expiration_refresh = data[	'refresh_token_expiration_time']
})

export default class AuthStore{
  access_token = '';
  refresh_token = '';
  expires_access = 0;
  expires_refresh = 0;

  static changeTokensHandler () {}

  static getTokens() {
    this.access_token = localStorage.getItem('access_token');
    this.expires_access = Number(localStorage.getItem('expires_access'));

    this.refresh_token = localStorage.getItem('refresh_token');
    this.expires_refresh = Number(localStorage.getItem('expires_refresh'));

    this.changeTokensHandler(this.expires_access, this.expires_refresh);
  }

  static setTokens(access, refresh) {
    this.setAccessToken(access)
    this.setRefreshToken(refresh)
  }

  static clear() {
    this.access_token = '';
    this.refresh_token = '';
    this.expires_access = 0;
    this.expires_refresh = 0;

    localStorage.clear();
    this.changeTokensHandler(this.expires_access, this.expires_refresh);
  }

  static setAccessToken(token) {
    localStorage.setItem("access_token", token)
    this.access_token = token;

    const expires_access = Date.now() + expiration_access * 60 * 1000 - 20000
    localStorage.setItem("expires_access", expires_access)
    this.expires_access = expires_access;

    this.changeTokensHandler(this.expires_access, this.expires_refresh);
  }

  static setRefreshToken(token) {
    localStorage.setItem("refresh_token", token)
    this.refresh_token = token;

    const expires_refresh = Date.now() + expiration_refresh * 60 * 1000 - 20000
    localStorage.setItem("expires_refresh", expires_refresh)
    this.expires_refresh = expires_refresh;
  }

  static setChangeTokensHandler(handler) {
    this.changeTokensHandler = handler;
  }
}
