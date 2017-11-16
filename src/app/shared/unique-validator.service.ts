import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';

interface IStatusResponse {
  status : number;
  message : string;
}


@Injectable()
export class UniqueValidatorService {

  restEndPoint : string = environment.endPoint;

  constructor(private _http : HttpClient) { }

  /**
   * 
   * @param keyUrl 
   * @param keyValue 
   * @param keyId 
   * Method to communicate to the backend
   */
  validateToBackEnd(keyUrl : string, keyValue : any, keyId : number, keyField : string){
    // This is a shorthand properties of object declaration
    const body = {
          keyId,
          keyValue,
         'keyField' : keyField || null
    };

    return this._http.post<IStatusResponse>(`${this.restEndPoint}/${keyUrl}`,body);

  }

}
