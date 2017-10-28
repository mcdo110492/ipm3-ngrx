
import { DataSource } from "@angular/cdk/collections";
import { Observable } from 'rxjs/Observable';
import { EmployeeStatus } from './../models/employee-status.model';

export class EmployeeStatusTableDatasource extends DataSource<EmployeeStatus> {

    constructor(private _collections$ : Observable<EmployeeStatus[]>){
        super()
    }

    connect() : Observable<EmployeeStatus[]> {
        return this._collections$;
    }

    disconnect() : void {

    }

}