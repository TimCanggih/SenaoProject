import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()

export class SignInService{

    constructor(private http: Http){}

    getAuthData(login){
        let url = "https://cors-anywhere.herokuapp.com/http://jabarbasithme.com/senaoquery/Login.php?username=" + login.username + "&password=" + login.password;
        return this.http.get(url).map((res:Response) => res.json());
    }
}