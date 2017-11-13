import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

import { environment } from "./../../../../environments/environment";

import { EmployeePersonal } from "./models/employee-personal.models";

import { MomentService } from "./../../../core/services/moment.service";

interface DataResponse {
  status    : number;
  data      : EmployeePersonal;
}

interface StatusResponse {
  status    : number;
  message   : string;
}

@Injectable()
export class EmployeePersonalInformationService {

  private _restEndpoint : string = environment.endPoint;

  constructor(private _http : HttpClient, private _moment : MomentService) { }

  getPersonal(id : number) {
    return this._http.get<DataResponse>(`${this._restEndpoint}/employee/personal/${id}`);
  }

  updatePersonal(data : EmployeePersonal){
    
    const newData  = {
      employeeNumber : data.employeeNumber,
      firstName      : data.firstName,
      middleName     : data.middleName,
      lastName       : data.lastName,
      birthday       : this._moment.parseDateToMoment(data.birthday),
      placeOfBirth   : data.placeOfBirth,
      civilStatus    : data.civilStatus,
      citizenship    : data.citizenship,
      religion       : data.religion
    };

    return this._http.put<StatusResponse>(`${this._restEndpoint}/employee/personal/${data.employeeId}`,newData);
  }

}
