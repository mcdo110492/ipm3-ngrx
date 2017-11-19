

import { DataSource } from "@angular/cdk/collections";
import { Observable } from 'rxjs/Observable';
import { Units } from './../models/units.model';

export class UnitsTableDatasource extends DataSource<Units> {

    constructor(private _collections$ : Observable<Units[]>){
        super()
    }

    connect() : Observable<Units[]> {
        return this._collections$;
    }

    disconnect() : void {

    }

}