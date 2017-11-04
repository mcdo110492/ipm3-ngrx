import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

import { environment } from "./../../../../environments/environment";

import { EmployeeHealth } from "./models/employee-health.model";

interface DataResponse {
  status    : number;
  data      : EmployeeHealth;
}

interface StatusResponse {
  status    : number;
  message   : string;
}

@Injectable()
export class EmployeeHealthInformationService {

  private _restEndpoint : string = environment.endPoint;
  
    constructor(private _http : HttpClient) { }
  
    getHealth(id : number) {
      return this._http.get<DataResponse>(`${this._restEndpoint}/employee/health/${id}`);
    }
  
    updateHealth(data : EmployeeHealth){
      return this._http.put<StatusResponse>(`${this._restEndpoint}/employee/health/${data.employeeHealthId}`,data);
    }

}
