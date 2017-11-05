import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

import { MatDialog } from "@angular/material";

import { environment } from "./../../../../environments/environment";

import { EmployeeLicense } from "./models/employee-licenses.models";

import { EmployeeLicensesFormComponent } from "./employee-licenses-form/employee-licenses-form.component";

import { MomentService } from "./../../../core/services/moment.service";

interface DataResponse {
  status    : number;
  data      : EmployeeLicense[];
}

interface StatusResponse {
  status    : number;
  message   : string;
}


@Injectable()
export class EmployeeLicensesService {

  private _restEndpoint : string = environment.endPoint;
  
    constructor(private _http : HttpClient, private _dialog : MatDialog, private _moment : MomentService) { }
  
    getLicenses(id : number) {
      return this._http.get<DataResponse>(`${this._restEndpoint}/employee/license/${id}`);
    }
  
    saveLicense(data : EmployeeLicense, id : number){
      return this._http.post<StatusResponse>(`${this._restEndpoint}/employee/license/${id}`,data);
    }

    updateLicense(data : EmployeeLicense){

      const newData = {
        licenseNumber : data.licenseNumber,
        licenseType   : data.licenseType,
        dateIssued    : this._moment.parseDateToMoment(data.dateIssued),
        dateExpiry    : this._moment.parseDateToMoment(data.dateExpiry)
      }

      return this._http.put<StatusResponse>(`${this._restEndpoint}/employee/license/${data.employeeLicenseId}`,newData);
    }

    openFormDialog() : void{
      
          let dialogRef = this._dialog.open(EmployeeLicensesFormComponent, {
            width: 'auto',
            disableClose : true
          });
      
        }

}
