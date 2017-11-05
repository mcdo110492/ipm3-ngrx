import { DataSource } from "@angular/cdk/collections";
import { Observable } from 'rxjs/Observable';

import { EmployeeEducational } from "./../models/employee-educational.model";


export class EmployeeEducationalDatasource extends DataSource<EmployeeEducational> {
    
        constructor(private _collections$ : Observable<EmployeeEducational[]>){
            super()
        }
    
        connect() : Observable<EmployeeEducational[]> {
            return this._collections$;
        }
    
        disconnect() : void {
    
        }
    
    }