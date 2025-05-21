import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  constructor() { }

  /**
   * Return the coockie value by name
   * @param name cookie name
   */
  public getCookie(name: string) {
    if (!name) { return null; }
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') { c = c.substring(1, c.length); }
      if (c.indexOf(nameEQ) === 0) { return c.substring(nameEQ.length, c.length); }
    }
    return null;
  }

  /**
   * Deletes the coockie with given name
   * @param name cookie name
   * @param path path of the cookie
   * @param domain domain of the cookie .localhost
   */
  public deleteCookie(name: string, path: string = '; path=/', domain: string = '; domain=.localhost') {
    this.setCookie(name, '', -1, path, domain);
  }

  /**
   * Creates/sets the cookie
   * @param name name of cookie
   * @param value cookie value
   * @param days validity in days
   * @param path (optional) path of the cookie
   * @param domain (optional) domain of the cookie .localhost
   */
  public setCookie(name: string, value: string, days: number, path: string = '; path=/', domain: string = '; domain=.localhost') {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + value + expires + path + domain;
  }

}