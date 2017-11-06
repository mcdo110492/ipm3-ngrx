import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

import { MatDialog } from "@angular/material";

import { environment } from "./../../../../environments/environment";

import { EmployeeClub } from "./models/employee-club.model";

import { EmployeeClubFormComponent } from "./employee-club-form/employee-club-form.component";

import { MomentService } from "./../../../core/services/moment.service";

interface DataResponse {
  status    : number;
  data      : EmployeeClub[];
}

interface StatusResponse {
  status    : number;
  message   : string;
}

@Injectable()
export class EmployeeClubInformationService {

  private _restEndpoint : string = environment.endPoint;
  
    constructor(private _http : HttpClient, private _dialog : MatDialog, private _moment : MomentService) { }
  
    getClub(id : number) {
      return this._http.get<DataResponse>(`${this._restEndpoint}/employee/club/${id}`);
    }
  
    saveClub(data : EmployeeClub, id : number){
      return this._http.post<StatusResponse>(`${this._restEndpoint}/employee/club/${id}`,data);
    }

    updateClub(data : EmployeeClub){

      const newData = {
        clubName        : data.clubName,
        clubPosition    : data.clubPosition,
        membershipDate  : this._moment.parseDateToMoment(data.membershipDate)
      }

      return this._http.put<StatusResponse>(`${this._restEndpoint}/employee/club/${data.employeeClubId}`,newData);
    }

    openFormDialog() : void{
      
          let dialogRef = this._dialog.open(EmployeeClubFormComponent, {
            width: 'auto',
            disableClose : true
          });
      
        }

}
