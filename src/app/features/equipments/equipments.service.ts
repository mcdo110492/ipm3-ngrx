import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

import { MatDialog } from "@angular/material";
import { EquipmentsFormComponent } from "./equipments-form/equipments-form.component";

import { Equipment } from "./models/equipments.model";

import { environment } from "./../../../environments/environment";

export interface DataResponse {
  status : number;
  count  : number;
  data   : Equipment[];
}

export interface StatusResponse {
  status        : number;
  message       : string;
}

export interface UpdateResponse {
  status      : number;
  message     : number;
  updatedData : Equipment;
}

@Injectable()
export class EquipmentsService {

  restEndPoint : string = environment.endPoint;
  
    constructor(private _http : HttpClient, private _dialog : MatDialog) { }
  
    loadData(pageIndex : number, pageSize: number, sortField : string, sortDirection : string,searchQuery : string, projectId : number) {
  
      const params = new HttpParams()
            .set('filter',searchQuery)
            .append('field',sortField)
            .append('limit', pageSize.toString())
            .append('page', (pageIndex + 1).toString())
            .append('order',sortDirection)
            .append('projectId',projectId.toString());
  
      return this._http.get<DataResponse>(`${this.restEndPoint}/equipments`,{ params : params });
    }
  
    save(equipment : Equipment, projectId : number){
       const newData : Equipment = {
          equipmentId     : 0,
          equipmentCode   : equipment.equipmentCode,
          bodyNumber      : equipment.bodyNumber,
          model           : equipment.model,
          capacity        : equipment.capacity,
          plateNo         : equipment.plateNo,
          unitId          : equipment.unitId,
          projectId       : projectId
       };
      return this._http.post<StatusResponse>(`${this.restEndPoint}/equipments`,newData);
  
    }
  
    update(equipment : Equipment){
  
      return this._http.put<UpdateResponse>(`${this.restEndPoint}/equipments/${equipment.equipmentId}`,equipment);
  
    }

    changeStatus(id : number, status : number){
      const newData = {
        status
      };
      return this._http.put<UpdateResponse>(`${this.restEndPoint}/equipments/status/${id}`,newData);

    }
  
    openFormDialog() : void{
  
      let dialogRef = this._dialog.open(EquipmentsFormComponent, {
        width: 'auto',
        disableClose : true
      });
  
    }

}
