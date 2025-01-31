import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { PeticionesHttp } from 'src/helper/consultas-http';

@Injectable({ providedIn: 'root' })

export class AuthService {

  urlServer = 'http://51.79.26.171';
  httpHeaders = { headers: new HttpHeaders({ "Content-Type": "application/json" }) };

  public PeticionesHttp: PeticionesHttp;

  constructor(private http: HttpClient, private router: Router, private storage: Storage) {
    this.PeticionesHttp = new PeticionesHttp(http);
  }

  async login(credentials: any) {
    await this.storage.create();
    let params = {
      user: {
        email: credentials.email,
        password: credentials.password
      }
    }

    const response = await this.PeticionesHttp.post('login', params);

    if (response.status == 'OK') {
      this.storage.set('user', response.user);
      this.storage.set('isUserLoggedIn', true);
      this.router.navigateByUrl('/menu/home');

      return ''
    } else {
      return response.error ? 'Usuario o contraseña incorrectos' : 'Ha ocurrido un error intentelo mas tarde';
    }
  }

  async register(data: any) {
    let params = {
      user: {
        name: data.name,
        last_name: data.last_name,
        username: data.username,
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
      }
    }

    try {
      const response = await this.PeticionesHttp.post('signup', params)
      if (response.status == 'OK') {
        return { success: true, msg: response.msg }
      } else {
        return { successs: false, msg: response.error.errors }
      }

    } catch (error: any) {
      console.log("🚀 ~ AuthService ~ //returnnewPromise ~ error:", error)
      return { success: false, msg: error.error.errors }
    }
  }
}
