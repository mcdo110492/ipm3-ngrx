import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

import { environment } from "./../../environments/environment";

import { ProjectResponse, PositionResponse, EmployeeStatusResponse, EmploymentStatusResponse, UnitsResponse, EquipmentResponse, CollectionScheduleResponse, CollectionTypeResponse } from "./models/master-data.models";

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

  getAllEquipments(projectId : number) {

    const params = new HttpParams()
    .set('projectId',projectId.toString());
    
    return this._http.get<EquipmentResponse>(`${this.restEndPoint}/equipments/all`, { params: params });
  }

  getAllCollectionSchedules() {
    return this._http.get<CollectionScheduleResponse>(`${this.restEndPoint}/collection/schedules/all`);
  }

  getAllCollectionTypes() {
    return this._http.get<CollectionTypeResponse>(`${this.restEndPoint}/collection/types/all`);
  }

}
