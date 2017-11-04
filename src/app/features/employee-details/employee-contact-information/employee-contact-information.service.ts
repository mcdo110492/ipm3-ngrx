import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

import { environment } from "./../../../../environments/environment";

import { EmployeeContact } from "./models/employee-contact.model";

interface DataResponse {
  status    : number;
  data      : EmployeeContact;
}

interface StatusResponse {
  status    : number;
  message   : string;
}

@Injectable()
export class EmployeeContactInformationService {

  private _restEndpoint : string = environment.endPoint;
  
    constructor(private _http : HttpClient) { }
  
    getContact(id : number) {
      return this._http.get<DataResponse>(`${this._restEndpoint}/employee/contact/${id}`);
    }
  
    updateContact(data : EmployeeContact){
      return this._http.put<StatusResponse>(`${this._restEndpoint}/employee/contact/${data.employeeContactId}`,data);
    }

}
