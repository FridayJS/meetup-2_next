
/** 
 * SIMPLE AUTH CHECKING ON CLIENT SIDE WITH LOCAL STORAGE.
 * IT ALSO CAN BE DONE ON SERVER SIDE WITH COOKIES
 */
export class AuthService {

  static setTokens(jwt, refresh_token) {
    if (!process.browser) return;
    localStorage.setItem('jwt', jwt);
    localStorage.setItem('refresh_token', refresh_token);
    localStorage.setItem('refresh_token_expired', Date.now());
  }

  static updateToken(jwt) {
    if (!process.browser) return false;

    localStorage.setItem('jwt', jwt);
    localStorage.setItem('refresh_token_expired', Date.now());
  }

  static unsetTokens() {
    if (!process.browser) return false;

    localStorage.clear();
  };

  static getTokens() {
    if (!process.browser) return false;
    const jwt = localStorage.getItem('jwt');
    const refresh_token = localStorage.getItem('refresh_token');
    const refresh_token_expired = localStorage.getItem('refresh_token_expired');

    return { jwt, refresh_token, refresh_token_expired };
  }

  static isLogged() {
    if (!process.browser) return false;
    const jwt = localStorage.getItem('jwt');
    const refresh_token = localStorage.getItem('refresh_token');
    return jwt && refresh_token;
  }

}
