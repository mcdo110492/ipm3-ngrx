

import { DataSource } from "@angular/cdk/collections";
import { Observable } from 'rxjs/Observable';
import { CollectionSchedules } from './../models/collection-schedules.model';

export class CollectionSchedulesTableDatasource extends DataSource<CollectionSchedules> {

    constructor(private _collections$ : Observable<CollectionSchedules[]>){
        super()
    }

    connect() : Observable<CollectionSchedules[]> {
        return this._collections$;
    }

    disconnect() : void {

    }

}