import { DataSource } from "@angular/cdk/collections";
import { Observable } from 'rxjs/Observable';

import { EmployeeClub } from "./../models/employee-club.model";


export class EmployeeClubDatasource extends DataSource<EmployeeClub> {
    
        constructor(private _collections$ : Observable<EmployeeClub[]>){
            super()
        }
    
        connect() : Observable<EmployeeClub[]> {
            return this._collections$;
        }
    
        disconnect() : void {
    
        }
    
    }