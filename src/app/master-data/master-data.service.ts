import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

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

}
