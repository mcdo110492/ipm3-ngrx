

import { DataSource } from "@angular/cdk/collections";
import { Observable } from 'rxjs/Observable';
import { CollectionTypes } from './../models/collection-types.model';

export class CollectionTypesTableDatasource extends DataSource<CollectionTypes> {

    constructor(private _collections$ : Observable<CollectionTypes[]>){
        super()
    }

    connect() : Observable<CollectionTypes[]> {
        return this._collections$;
    }

    disconnect() : void {

    }

}