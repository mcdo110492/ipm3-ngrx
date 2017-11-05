import { DataSource } from "@angular/cdk/collections";
import { Observable } from 'rxjs/Observable';

import { EmployeeLicense } from "./../models/employee-licenses.models";


export class EmployeeLicensesDatasource extends DataSource<EmployeeLicense> {
    
        constructor(private _collections$ : Observable<EmployeeLicense[]>){
            super()
        }
    
        connect() : Observable<EmployeeLicense[]> {
            return this._collections$;
        }
    
        disconnect() : void {
    
        }
    
    }