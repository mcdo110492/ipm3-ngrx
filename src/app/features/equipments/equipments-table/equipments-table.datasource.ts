
import { DataSource } from "@angular/cdk/collections";
import { Observable } from 'rxjs/Observable';
import { Equipment } from './../models/equipments.model';

export class EquipmentsTableDatasource extends DataSource<Equipment> {

    constructor(private _collections$ : Observable<Equipment[]>){
        super()
    }

    connect() : Observable<Equipment[]> {
        return this._collections$;
    }

    disconnect() : void {

    }

}