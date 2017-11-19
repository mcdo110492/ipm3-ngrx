import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

import { MatDialog } from "@angular/material";
import { CollectionSchedulesFormComponent } from "./collection-schedules-form/collection-schedules-form.component";

import { CollectionSchedules } from "./models/collection-schedules.model";

import { environment } from "./../../../environments/environment";

export interface DataResponse {
  status : number;
  count  : number;
  data   : CollectionSchedules[];
}

export interface StatusResponse {
  status        : number;
  message       : string;
}

@Injectable()
export class CollectionSchedulesService {

  restEndPoint : string = environment.endPoint;
  
    constructor(private _http : HttpClient, private _dialog : MatDialog) { }
  
    loadData(pageIndex : number, pageSize: number, sortField : string, sortDirection : string,searchQuery : string) {
  
      const params = new HttpParams()
            .set('filter',searchQuery)
            .append('field',sortField)
            .append('limit', pageSize.toString())
            .append('page', (pageIndex + 1).toString())
            .append('order',sortDirection);
  
      return this._http.get<DataResponse>(`${this.restEndPoint}/collection/schedules`,{ params : params });
    }
  
    save(collectionSchedules : CollectionSchedules){
  
      return this._http.post<StatusResponse>(`${this.restEndPoint}/collection/schedules`,collectionSchedules);
  
    }
  
    update(collectionSchedules : CollectionSchedules){
  
      return this._http.put<StatusResponse>(`${this.restEndPoint}/collection/schedules/${collectionSchedules.collectionScheduleId}`,collectionSchedules)
  
    }
  
    openFormDialog() : void{
  
      let dialogRef = this._dialog.open(CollectionSchedulesFormComponent, {
        width: 'auto',
        disableClose : true
      });
  
    }

}
