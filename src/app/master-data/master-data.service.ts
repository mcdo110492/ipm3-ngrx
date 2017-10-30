import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";


import { Projects } from "./../features/projects/models/projects.model";
import { Position } from "./../features/positions/models/positions.model";
import { EmploymentStatus } from "./../features/employment-status/models/employment-status.model";
import { EmployeeStatus } from "./../features/employee-status/models/employee-status.model";

import { environment } from "./../../environments/environment";

export interface ProjectResponse {
  status : number;
  data   : Projects[];
}

export interface PositionResponse {
  status : number;
  data   : Position[];
}

export interface EmploymentStatusResponse {
  status : number;
  data   : EmploymentStatus[];
}

export interface EmployeeStatusResponse {
  status : number;
  data   : EmployeeStatus[];
}


@Injectable()
export class MasterDataService {

  restEndPoint : string = environment.endPoint;
  constructor(private _http : HttpClient) { }

  getProjects() {
    return this._http.get<ProjectResponse>(`${this.restEndPoint}/projects/all`);
  }

  getPositions() {
    return this._http.get<PositionResponse>(`${this.restEndPoint}/positions/all`);
  }

  getEmploymentStatus() {
    return this._http.get<EmploymentStatusResponse>(`${this.restEndPoint}/employmentStatus/all`);
  }

  getEmployeeStatus() {
    return this._http.get<EmployeeStatusResponse>(`${this.restEndPoint}/employeeStatus/all`);
  }

}
