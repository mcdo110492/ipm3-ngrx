
import { DataSource } from "@angular/cdk/collections";
import { Observable } from 'rxjs/Observable';
import { Position } from './../models/positions.model';

export class PositionsTableDatasource extends DataSource<Position> {

    constructor(private _collections$ : Observable<Position[]>){
        super()
    }

    connect() : Observable<Position[]> {
        return this._collections$;
    }

    disconnect() : void {

    }

}