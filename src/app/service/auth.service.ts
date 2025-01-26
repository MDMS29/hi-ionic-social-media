import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class AuthService {

  constructor() { }

  login(credentials: any) {
    return new Promise((accept, reject) => {
      if (credentials.email === 'mazomoises@gmail.com') {
        accept('Login correcto');
      } else {
        reject('Login incorrecto');
      }
    });
  }
}
