import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

import { MatDialog } from "@angular/material";
import { PositionsFormComponent } from "./positions-form/positions-form.component";

import { Position } from "./models/positions.model";

import { environment } from "./../../../environments/environment";

export interface DataResponse {
  status : number;
  count  : number;
  data   : Position[];
}

export interface StatusResponse {
  status  : number;
  message : string;
}

@Injectable()
export class PositionsService {

  restEndPoint : string = environment.endPoint;
  
    constructor(private _http : HttpClient, private _dialog : MatDialog) { }
  
    loadData(pageIndex : number, pageSize: number, sortField : string, sortDirection : string,searchQuery : string) {
  
      const params = new HttpParams()
            .set('filter',searchQuery)
            .append('field',sortField)
            .append('limit', pageSize.toString())
            .append('page', (pageIndex + 1).toString())
            .append('order',sortDirection);
  
      return this._http.get<DataResponse>(`${this.restEndPoint}/positions`,{ params : params });
    }
  
    save(data : Position){
  
      return this._http.post<StatusResponse>(`${this.restEndPoint}/positions`,data);
  
    }
  
    update(data : Position){
  
      return this._http.put<StatusResponse>(`${this.restEndPoint}/positions/${data.positionId}`,data)
  
    }
  
    openFormDialog() : void{
  
      let dialogRef = this._dialog.open(PositionsFormComponent, {
        width: '300px',
        disableClose : true
      });
  
    }

}
