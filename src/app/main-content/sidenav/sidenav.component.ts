import { Component, OnInit } from '@angular/core';

import { Store } from "@ngrx/store";
import * as linksAction from './../actions/router-links.actions';
import * as fromRouterLinks from './../reducers/router-links.reducers';
import { RouterLinks } from "./../models/router-links.model";

import { Observable } from 'rxjs/Observable';

import { sidenavMetaData } from "./sidenav.metadata";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  // Stream of Observable that will subscribe in the store
  links$ : Observable<RouterLinks[]>;

  constructor(private _store : Store<fromRouterLinks.State>) { 
    this.links$ = this._store.select(fromRouterLinks.getLinks);
  }

  ngOnInit() {
    this._store.dispatch( new linksAction.RoleRouterLinks(sidenavMetaData) );
  }




}
