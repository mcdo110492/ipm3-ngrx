import { DataSource } from "@angular/cdk/collections";
import { Observable } from 'rxjs/Observable';

import { EmployeeTraining } from "./../models/employee-training.model";


export class EmployeeTrainingDatasource extends DataSource<EmployeeTraining> {
    
        constructor(private _collections$ : Observable<EmployeeTraining[]>){
            super()
        }
    
        connect() : Observable<EmployeeTraining[]> {
            return this._collections$;
        }
    
        disconnect() : void {
    
        }
    
    }