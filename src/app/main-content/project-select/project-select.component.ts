import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from "@ngrx/store";
import * as fromMaster from './../../master-data/reducers/master-data.reducers';
import * as masterActions from './../../master-data/actions/master-data.actions';
import * as fromMain from './../reducers/main-content.reducers';
import * as mainActions from './../actions/main-content.actions';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import { Projects } from "./../../features/projects/models/projects.model";

@Component({
  selector: 'app-project-select',
  templateUrl: './project-select.component.html',
  styleUrls: ['./project-select.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class ProjectSelectComponent implements OnInit {

  projects        : Observable<Projects[]>; 
  currentProject  : number;

  constructor(private _masterStore : Store<fromMaster.State>, private _mainStore : Store<fromMain.State>) { 
    this.projects         = this._masterStore.select(fromMaster.getProjects);
  }

  ngOnInit() {
    this._masterStore.dispatch( new masterActions.GetAllProjects() );
    this._mainStore.select(fromMain.getCurrentProject).take(1)
    .subscribe((value) => this.currentProject = value);
  }


  onSelectProject(id) {
    this._mainStore.dispatch( new mainActions.ChangeProject(id) );
  }
}
