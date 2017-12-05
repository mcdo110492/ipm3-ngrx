
import { DataSource } from "@angular/cdk/collections";
import { Observable } from 'rxjs/Observable';
import { Shifts } from './../models/shifts.model';

export class ShiftsTableDatasource extends DataSource<Shifts> {

    constructor(private _collections$ : Observable<Shifts[]>){
        super()
    }

    connect() : Observable<Shifts[]> {
        return this._collections$;
    }

    disconnect() : void {

    }

}