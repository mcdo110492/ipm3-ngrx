
import { DataSource } from "@angular/cdk/collections";
import { Observable } from 'rxjs/Observable';
import { Projects } from './../models/projects.model';

export class ProjectsTableDatasource extends DataSource<Projects> {

    constructor(private _collections$ : Observable<Projects[]>){
        super()
    }

    connect() : Observable<Projects[]> {
        return this._collections$;
    }

    disconnect() : void {

    }

}