import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { environment } from "./../../../environments/environment";

import { Login, LoginResponse } from "./models/login.model";



@Injectable()
export class LoginService {

  private restEndPoint : string = environment.endPoint;

  constructor(private _http : HttpClient) { }

  autheticateCredentials(credentials : Login){

    return this._http.post<LoginResponse>(`${this.restEndPoint}/authenticate`,credentials);

  }

}
