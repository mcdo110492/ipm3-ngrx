import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

import { MatDialog } from "@angular/material";

import { environment } from "./../../../../environments/environment";

import { EmployeeTraining } from "./models/employee-training.model";

import { EmployeeTrainingFormComponent } from "./employee-training-form/employee-training-form.component";

import { MomentService } from "./../../../core/services/moment.service";

interface DataResponse {
  status    : number;
  data      : EmployeeTraining[];
}

interface StatusResponse {
  status    : number;
  message   : string;
}


@Injectable()
export class EmployeeTrainingInformationService {

  private _restEndpoint : string = environment.endPoint;
  
    constructor(private _http : HttpClient, private _dialog : MatDialog, private _moment : MomentService) { }
  
    getTraining(id : number) {
      return this._http.get<DataResponse>(`${this._restEndpoint}/employee/training/${id}`);
    }
  
    saveTraining(data : EmployeeTraining, id : number){
      return this._http.post<StatusResponse>(`${this._restEndpoint}/employee/training/${id}`,data);
    }

    updateTraining(data : EmployeeTraining){

      const newData = {
        trainingName    : data.trainingName,
        trainingTitle   : data.trainingTitle,
        trainingFrom    : this._moment.parseDateToMoment(data.trainingFrom),
        trainingTo      : this._moment.parseDateToMoment(data.trainingTo)
      }

      return this._http.put<StatusResponse>(`${this._restEndpoint}/employee/training/${data.employeeTrainingId}`,newData);
    }

    openFormDialog() : void{
      
          let dialogRef = this._dialog.open(EmployeeTrainingFormComponent, {
            width: 'auto',
            disableClose : true
          });
      
        }

}
