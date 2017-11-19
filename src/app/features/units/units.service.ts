import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

import { MatDialog } from "@angular/material";
import { UnitsFormComponent } from "./units-form/units-form.component";

import { Units } from "./models/units.model";

import { environment } from "./../../../environments/environment";

export interface DataResponse {
  status : number;
  count  : number;
  data   : Units[];
}

export interface StatusResponse {
  status        : number;
  message       : string;
}

@Injectable()
export class UnitsService {

  restEndPoint : string = environment.endPoint;
  
    constructor(private _http : HttpClient, private _dialog : MatDialog) { }
  
    loadData(pageIndex : number, pageSize: number, sortField : string, sortDirection : string,searchQuery : string) {
  
      const params = new HttpParams()
            .set('filter',searchQuery)
            .append('field',sortField)
            .append('limit', pageSize.toString())
            .append('page', (pageIndex + 1).toString())
            .append('order',sortDirection);
  
      return this._http.get<DataResponse>(`${this.restEndPoint}/units`,{ params : params });
    }
  
    save(units : Units){
  
      return this._http.post<StatusResponse>(`${this.restEndPoint}/units`,units);
  
    }
  
    update(units : Units){
  
      return this._http.put<StatusResponse>(`${this.restEndPoint}/units/${units.unitId}`,units)
  
    }
  
    openFormDialog() : void{
  
      let dialogRef = this._dialog.open(UnitsFormComponent, {
        width: 'auto',
        disableClose : true
      });
  
    }

}
