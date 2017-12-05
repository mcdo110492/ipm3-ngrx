import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

import { environment } from "./../../../../environments/environment";

import { EmployeeEmployment } from "./models/employee-employment.model";

import { MomentService } from "./../../../core/services/moment.service";

interface DataResponse {
  status    : number;
  data      : EmployeeEmployment;
}

interface StatusResponse {
  status    : number;
  message   : string;
}

@Injectable()
export class EmployeeEmploymentInformationService {

  private _restEndpoint : string = environment.endPoint;

  constructor(private _http : HttpClient, private _moment : MomentService) { }

  getEmployment(id : number) {
    return this._http.get<DataResponse>(`${this._restEndpoint}/employee/employment/${id}`);
  }

  updateEmployment(data : EmployeeEmployment){
    
    const newData  = {
        positionId              : data.positionId,
        employmentStatusId      : data.employmentStatusId,
        employeeStatusId        : data.employeeStatusId,
        dateHired               : this._moment.parseDateToMoment(data.dateHired),
        contractStart           : this._moment.parseDateToMoment(data.contractStart),
        contractEnd             : this._moment.parseDateToMoment(data.contractEnd),
        salary                  : data.salary,
        remarks                 : data.remarks
    };

    return this._http.put<StatusResponse>(`${this._restEndpoint}/employee/employment/${data.employeeEmploymentId}`,newData);
  }

}
