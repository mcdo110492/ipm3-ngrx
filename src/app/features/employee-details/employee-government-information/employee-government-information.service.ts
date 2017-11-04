import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

import { environment } from "./../../../../environments/environment";

import { EmployeeGovernment } from "./models/employee-government.model";

interface DataResponse {
  status    : number;
  data      : EmployeeGovernment;
}

interface StatusResponse {
  status    : number;
  message   : string;
}

@Injectable()
export class EmployeeGovernmentInformationService {

  private _restEndpoint : string = environment.endPoint;
  
    constructor(private _http : HttpClient) { }
  
    getGovernment(id : number) {
      return this._http.get<DataResponse>(`${this._restEndpoint}/employee/government/${id}`);
    }
  
    updateGovernment(data : EmployeeGovernment){
      return this._http.put<StatusResponse>(`${this._restEndpoint}/employee/government/${data.employeeGovernmentId}`,data);
    }

}
