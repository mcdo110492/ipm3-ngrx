import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

import { MatDialog } from "@angular/material";
import { EmploymentStatusFormComponent } from "./employment-status-form/employment-status-form.component";

import { EmploymentStatus } from "./models/employment-status.model";

import { environment } from "./../../../environments/environment";

export interface DataResponse {
  status : number;
  count  : number;
  data   : EmploymentStatus[];
}

export interface StatusResponse {
  status  : number;
  message : string;
}

@Injectable()
export class EmploymentStatusService {

  restEndPoint : string = environment.endPoint;
  
    constructor(private _http : HttpClient, private _dialog : MatDialog) { }
  
    loadData(pageIndex : number, pageSize: number, sortField : string, sortDirection : string,searchQuery : string) {
  
      const params = new HttpParams()
            .set('filter',searchQuery)
            .append('field',sortField)
            .append('limit', pageSize.toString())
            .append('page', (pageIndex + 1).toString())
            .append('order',sortDirection);
  
      return this._http.get<DataResponse>(`${this.restEndPoint}/employmentStatus`,{ params : params });
    }
  
    save(data : EmploymentStatus){
  
      return this._http.post<StatusResponse>(`${this.restEndPoint}/employmentStatus`,data);
  
    }
  
    update(data : EmploymentStatus){
  
      return this._http.put<StatusResponse>(`${this.restEndPoint}/employmentStatus/${data.employmentStatusId}`,data)
  
    }
  
    openFormDialog() : void{
  
      let dialogRef = this._dialog.open(EmploymentStatusFormComponent, {
        width: '300px',
        disableClose : true
      });
  
    }

}
