import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class MaterialTableService {

  constructor(private _http : HttpClient) { }

  loadElements(){

    return this._http.get('assets/material-table.json');

  }

}
