
import { DataSource } from "@angular/cdk/collections";
import { Observable } from 'rxjs/Observable';
import { EmploymentStatus } from './../models/employment-status.model';

export class EmploymentStatusTableDatasource extends DataSource<EmploymentStatus> {

    constructor(private _collections$ : Observable<EmploymentStatus[]>){
        super()
    }

    connect() : Observable<EmploymentStatus[]> {
        return this._collections$;
    }

    disconnect() : void {

    }

}