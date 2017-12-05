import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

import { MatDialog } from "@angular/material";
import { ShiftsFormComponent } from "./shifts-form/shifts-form.component";

import { Shifts } from "./models/shifts.model";

import { environment } from "./../../../environments/environment";
import { MomentService } from '../../core/services/moment.service';

export interface DataResponse {
  status : number;
  count  : number;
  data   : Shifts[];
}

export interface StatusResponse {
  status        : number;
  message       : string;
}

export interface UpdateResponse {
  status      : number;
  message     : number;
  updatedData : Shifts;
}


@Injectable()
export class ShiftsService {

  restEndPoint : string = environment.endPoint;
  
    constructor(private _http : HttpClient, private _dialog : MatDialog, private _moment : MomentService) { }
  
    loadData(pageIndex : number, pageSize: number, sortField : string, sortDirection : string,searchQuery : string, projectId : number) {
  
      const params = new HttpParams()
            .set('filter',searchQuery)
            .append('field',sortField)
            .append('limit', pageSize.toString())
            .append('page', (pageIndex + 1).toString())
            .append('order',sortDirection)
            .append('projectId',projectId.toString());
  
      return this._http.get<DataResponse>(`${this.restEndPoint}/shifts`,{ params : params });
    }
  
    save(shift : Shifts, projectId : number){
       const time = `${shift.shiftTime.getHours()}:${shift.shiftTime.getMinutes()}`;
       const newData  = {
          shiftId                : 0,
          equipmentId            : shift.equipmentId,
          collectionScheduleId   : shift.collectionScheduleId,
          collectionTypeId       : shift.collectionTypeId,
          geofenceName           : shift.geofenceName,
          sectors                : shift.sectors,
          shiftTime              : time,
          projectId              : projectId
       };
      return this._http.post<StatusResponse>(`${this.restEndPoint}/shifts`,newData);
  
    }
  
    update(shift : Shifts){
      const time = `${shift.shiftTime.getHours()}:${shift.shiftTime.getMinutes()}`;
      const newData  = {
        shiftId                : shift.shiftId,
        equipmentId            : shift.equipmentId,
        collectionScheduleId   : shift.collectionScheduleId,
        collectionTypeId       : shift.collectionTypeId,
        geofenceName           : shift.geofenceName,
        sectors                : shift.sectors,
        shiftTime              : time
     };

      return this._http.put<UpdateResponse>(`${this.restEndPoint}/shifts/${shift.shiftId}`,newData);
  
    }


  
    openFormDialog() : void{
  
      let dialogRef = this._dialog.open(ShiftsFormComponent, {
        width: '800px',
        disableClose : true
      });
  
    }

}
