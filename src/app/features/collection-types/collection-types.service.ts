import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

import { MatDialog } from "@angular/material";
import { CollectionTypesFormComponent } from "./collection-types-form/collection-types-form.component";

import { CollectionTypes } from "./models/collection-types.model";

import { environment } from "./../../../environments/environment";

export interface DataResponse {
  status : number;
  count  : number;
  data   : CollectionTypes[];
}

export interface StatusResponse {
  status        : number;
  message       : string;
}

@Injectable()
export class CollectionTypesService {

  restEndPoint : string = environment.endPoint;
  
    constructor(private _http : HttpClient, private _dialog : MatDialog) { }
  
    loadData(pageIndex : number, pageSize: number, sortField : string, sortDirection : string,searchQuery : string) {
  
      const params = new HttpParams()
            .set('filter',searchQuery)
            .append('field',sortField)
            .append('limit', pageSize.toString())
            .append('page', (pageIndex + 1).toString())
            .append('order',sortDirection);
  
      return this._http.get<DataResponse>(`${this.restEndPoint}/collection/types`,{ params : params });
    }
  
    save(collectionTypes : CollectionTypes){
  
      return this._http.post<StatusResponse>(`${this.restEndPoint}/collection/types`,collectionTypes);
  
    }
  
    update(collectionTypes : CollectionTypes){
  
      return this._http.put<StatusResponse>(`${this.restEndPoint}/collection/types/${collectionTypes.collectionTypeId}`,collectionTypes)
  
    }
  
    openFormDialog() : void{
  
      let dialogRef = this._dialog.open(CollectionTypesFormComponent, {
        width: 'auto',
        disableClose : true
      });
  
    }

}
