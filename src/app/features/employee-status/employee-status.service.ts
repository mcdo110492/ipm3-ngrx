import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

import { MatDialog } from "@angular/material";
import { EmployeeStatusFormComponent } from "./employee-status-form/employee-status-form.component";

import { EmployeeStatus } from "./models/employee-status.model";

import { environment } from "./../../../environments/environment";

export interface DataResponse {
  status : number;
  count  : number;
  data   : EmployeeStatus[];
}

export interface StatusResponse {
  status  : number;
  message : string;
}

@Injectable()
export class EmployeeStatusService {

  restEndPoint : string = environment.endPoint;
  
    constructor(private _http : HttpClient, private _dialog : MatDialog) { }
  
    loadData(pageIndex : number, pageSize: number, sortField : string, sortDirection : string,searchQuery : string) {
  
      const params = new HttpParams()
            .set('filter',searchQuery)
            .append('field',sortField)
            .append('limit', pageSize.toString())
            .append('page', (pageIndex + 1).toString())
            .append('order',sortDirection);
  
      return this._http.get<DataResponse>(`${this.restEndPoint}/employeeStatus`,{ params : params });
    }
  
    save(data : EmployeeStatus){
  
      return this._http.post<StatusResponse>(`${this.restEndPoint}/employeeStatus`,data);
  
    }
  
    update(data : EmployeeStatus){
  
      return this._http.put<StatusResponse>(`${this.restEndPoint}/employeeStatus/${data.employeeStatusId}`,data)
  
    }
  
    openFormDialog() : void{
  
      let dialogRef = this._dialog.open(EmployeeStatusFormComponent, {
        width: '300px',
        disableClose : true
      });
  
    }

}
