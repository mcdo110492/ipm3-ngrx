import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { EmployeeRegister } from "./models/employee-register.model";

import { environment } from "./../../../environments/environment";

import { MomentService } from "./../../core/services/moment.service";

@Injectable()
export class EmployeeRegisterService {

  private _restEndPoint : string = environment.endPoint;

  constructor(private _http : HttpClient, private _moment : MomentService) { }

  submitForm(data : EmployeeRegister, project : number){

    const newData = {
      employeeNumber      : data.personal.employeeNumber,
      firstName           : data.personal.firstName,
      middleName          : data.personal.middleName,
      lastName            : data.personal.lastName,
      birthday            : this._moment.parseDateToMoment(data.personal.birthday),
      placeOfBirth        : data.personal.placeOfBirth,
      civilStatus         : data.personal.civilStatus,
      citizenship         : data.personal.citizenship,
      religion            : data.personal.religion,
      positionId          : data.employment.positionId,
      employeeStatusId    : data.employment.employeeStatusId,
      employmentStatusId  : data.employment.employmentStatusId,
      contractStart       : this._moment.parseDateToMoment(data.employment.contractStart),
      contractEnd         : this._moment.parseDateToMoment(data.employment.contractEnd),
      projectId           : project
    };
    return this._http.post(`${this._restEndPoint}/employee/register`,newData);
  }

}
