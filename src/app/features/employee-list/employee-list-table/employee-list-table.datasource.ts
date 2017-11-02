import { DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable";

import { EmployeeList } from "./../models/employee-list.models";

export class EmployeeListTableDatasource extends DataSource<EmployeeList> {
    
        constructor(private _collections$ : Observable<EmployeeList[]>){
            super()
        }
    
        connect() : Observable<EmployeeList[]> {
            return this._collections$;
        }
    
        disconnect() : void {
    
        }
    
    }