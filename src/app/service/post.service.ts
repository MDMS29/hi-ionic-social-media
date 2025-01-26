import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PostService {

  urlServer = 'http://51.79.26.171';
  httpHeaders = { headers: new HttpHeaders({ "Content-Type": "application/json" }) };

  constructor(private http: HttpClient) { }

  getPosts() {
    return new Promise((accept, reject) => {
      this.http.get(`${this.urlServer}/posts`, this.httpHeaders).subscribe(
        (data: any) => {
          accept(data);
        },
        (error) => {
          if (error.status >= 400 && error.status <= 499) {
            reject('INTERNAL SERVER ERROR');
          } else {
            reject('No han podido obtener los posts');
          }
        }
      )
    });
  }

}
