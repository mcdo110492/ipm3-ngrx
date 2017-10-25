import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

import { Projects } from "./models/projects.model";

import { environment } from "./../../../environments/environment";

export interface DataResponse {
  status : number;
  count  : number;
  data   : Projects[];
}

@Injectable()
export class ProjectsService {

  restEndPoint : string = environment.endPoint;

  constructor(private _http : HttpClient) { }

  loadData(pageIndex : number, pageSize: number, sortField : string, sortDirection : string,searchQuery : string) {

    const params = new HttpParams()
          .set('filter',searchQuery)
          .append('field',sortField)
          .append('limit', pageSize.toString())
          .append('page',pageIndex.toString())
          .append('order',sortDirection);

    return this._http.get<DataResponse>(`${this.restEndPoint}/projects`,{ params : params });
  }

}
