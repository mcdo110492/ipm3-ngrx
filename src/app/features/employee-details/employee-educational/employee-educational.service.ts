import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

import { MatDialog } from "@angular/material";

import { environment } from "./../../../../environments/environment";

import { EmployeeEducational } from "./models/employee-educational.model";

import { EmployeeEducationalFormComponent } from "./employee-educational-form/employee-educational-form.component";

interface DataResponse {
  status    : number;
  data      : EmployeeEducational[];
}

interface StatusResponse {
  status    : number;
  message   : string;
}
@Injectable()
export class EmployeeEducationalService {

  private _restEndpoint : string = environment.endPoint;
  
    constructor(private _http : HttpClient, private _dialog : MatDialog) { }
  
    getEducational(id : number) {
      return this._http.get<DataResponse>(`${this._restEndpoint}/employee/education/${id}`);
    }
  
    saveEducational(data : EmployeeEducational, id : number){
      return this._http.post<StatusResponse>(`${this._restEndpoint}/employee/education/${id}`,data);
    }

    updateEducational(data : EmployeeEducational){

      return this._http.put<StatusResponse>(`${this._restEndpoint}/employee/education/${data.employeeEducationId}`,data);
    }

    openFormDialog() : void{
      
          let dialogRef = this._dialog.open(EmployeeEducationalFormComponent, {
            width: 'auto',
            disableClose : true
          });
      
        }

}
