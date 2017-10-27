import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

import { MatDialog } from "@angular/material";
import { ProjectsFormComponent } from "./projects-form/projects-form.component";

import { Projects } from "./models/projects.model";

import { environment } from "./../../../environments/environment";

export interface DataResponse {
  status : number;
  count  : number;
  data   : Projects[];
}

export interface StatusResponse {
  status  : number;
  message : string;
}

@Injectable()
export class ProjectsService {

  restEndPoint : string = environment.endPoint;

  constructor(private _http : HttpClient, private _dialog : MatDialog) { }

  loadData(pageIndex : number, pageSize: number, sortField : string, sortDirection : string,searchQuery : string) {

    const params = new HttpParams()
          .set('filter',searchQuery)
          .append('field',sortField)
          .append('limit', pageSize.toString())
          .append('page', (pageIndex + 1).toString())
          .append('order',sortDirection);

    return this._http.get<DataResponse>(`${this.restEndPoint}/projects`,{ params : params });
  }

  save(project : Projects){

    return this._http.post<StatusResponse>(`${this.restEndPoint}/projects`,project);

  }

  update(project : Projects){

    return this._http.put<StatusResponse>(`${this.restEndPoint}/projects/${project.projectId}`,project)

  }

  openFormDialog() : void{

    let dialogRef = this._dialog.open(ProjectsFormComponent, {
      width: 'auto',
      disableClose : true
    });

  }

}
