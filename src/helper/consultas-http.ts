import { HttpClient, HttpHeaders } from "@angular/common/http";



export class PeticionesHttp {
    private urlServer = 'http://51.79.26.171';
    private httpHeaders = { headers: new HttpHeaders({ "Content-Type": "application/json" }) };

    constructor(private http: HttpClient) { }

    async get(url: string) { }

    async post(fixedUrl: string, params: any): Promise<any> {
        return new Promise((accept, reject) => {
            this.http.post(`${this.urlServer}/${fixedUrl}`, params, this.httpHeaders).subscribe(
                (data: any) => {
                    accept(data);
                },
                (error) => {
                    reject(error);
                }
            )
        });
    }
}