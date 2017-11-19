import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { environment } from "./../../environments/environment";

import { ProjectResponse, PositionResponse, EmployeeStatusResponse, EmploymentStatusResponse, UnitsResponse } from "./models/master-data.models";

@Injectable()
export class MasterDataService {

  restEndPoint : string = environment.endPoint;
  constructor(private _http : HttpClient) { }

  getAllProjects() {
    return this._http.get<ProjectResponse>(`${this.restEndPoint}/projects/all`);
  }

  getAllPositions() {
    return this._http.get<PositionResponse>(`${this.restEndPoint}/positions/all`);
  }

  getAllEmploymentStatus() {
    return this._http.get<EmploymentStatusResponse>(`${this.restEndPoint}/employmentStatus/all`);
  }

  getAllEmployeeStatus() {
    return this._http.get<EmployeeStatusResponse>(`${this.restEndPoint}/employeeStatus/all`);
  }

  getAllUnits() {
    return this._http.get<UnitsResponse>(`${this.restEndPoint}/units/all`);
  }

}
