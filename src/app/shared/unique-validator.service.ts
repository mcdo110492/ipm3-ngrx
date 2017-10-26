import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';

import 'rxjs/add/operator/debounceTime';



interface IStatusResponse {
  status : number;
  message : string;
}


@Injectable()
export class UniqueValidatorService {

  restEndPoint : string = environment.endPoint;

  constructor(private _http : HttpClient) { }

  validateToBackEnd(keyUrl : string, keyValue : any, keyId : number){

    const body = {
          keyId     : keyId,
          keyValue  : keyValue
    };

    return this._http.post<IStatusResponse>(`${this.restEndPoint}/${keyUrl}`,body);

  }

}
