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
    }else{
      return response.error ? 'Usuario o contraseña incorrectos' : 'Ha ocurrido un error intentelo mas tarde';
    }
  }

  register(data: any) {
    return new Promise((accept, reject) => {
      let params = {
        user: {
          email: data.email,
          password: data.password,
          password_confirmation: data.password_confirmation,
          name: data.name,
          last_name: data.last_name,
          username: data.username
        }
      }
      this.http.post(`${this.urlServer}/signup`, params, this.httpHeaders).subscribe(
        (data: any) => {
          if (data.status == 'OK') {
            accept(data);
          } else {
            reject(data.errors);
          }
        },
        (error) => {
          if (error.status >= 400 && error.status <= 499) {
            reject(error.error.errors);
          } else if (error.status > 499) {
            reject('INTERNAL SERVER ERROR');
          }
        }
      )
    });
  }
}
