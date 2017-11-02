import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

import { EmployeeList } from "./models/employee-list.models";

import { environment } from "./../../../environments/environment";

export interface DataResponse {
  status : number;
  count  : number;
  data   : EmployeeList[];
}

export interface StatusResponse {
  status  : number;
  message : string;
}

@Injectable()
export class EmployeeListService {

  restEndPoint : string = environment.endPoint;
  
    constructor(private _http : HttpClient) { }
  
    loadData(pageIndex : number, pageSize: number, sortField : string, sortDirection : string,searchQuery : string,project : number) {
  
      const params = new HttpParams()
            .set('filter',searchQuery)
            .append('field',sortField)
            .append('limit', pageSize.toString())
            .append('page', (pageIndex + 1).toString())
            .append('order',sortDirection)
            .append('projectId',project.toString());
  
      return this._http.get<DataResponse>(`${this.restEndPoint}/employee`,{ params : params });
    }
  

}
