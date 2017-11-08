import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from "@ngrx/store";
import * as linksAction from './../actions/router-links.actions';
import * as fromRouterLinks from './../reducers/router-links.reducers';
import { RouterLinks } from "./../models/router-links.model";

import * as loginActions from './../../features/login/actions/login.actions';
import * as fromLogin from './../../features/login/reducers/login.reducers';

import { Observable } from 'rxjs/Observable';
import { Subscription } from "rxjs/Subscription";

import { SidenavService } from "./sidenav.service";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  providers : [SidenavService]
})
export class SidenavComponent implements OnInit, OnDestroy {

  subscription : Subscription;
  // Stream of Observable that will subscribe in the store
  links$          : Observable<RouterLinks[]>;
  profileName     : Observable<string>;
  profileImage    : Observable<string>;
  role            : Observable<number>;
  
  constructor(private _routerLinkStore : Store<fromRouterLinks.State>,private _loginStore : Store<fromLogin.State>, private _service : SidenavService) { 
    this.links$           = this._routerLinkStore.select(fromRouterLinks.getLinks);
    this.profileImage     = this._loginStore.select(fromLogin.getProfileImage);
    this.profileName      = this._loginStore.select(fromLogin.getProfileName);
    this.role             = this._loginStore.select(fromLogin.getRole);
  }

  ngOnInit() {

    this.subscription = this.role.subscribe((role) => {

      const linksData : RouterLinks[] = this._service.setLinksByRole(role);

      this._routerLinkStore.dispatch( new linksAction.RoleRouterLinks(linksData) );

    });
    
  
  }

  ngOnDestroy() : void {
    this.subscription.unsubscribe();
  }


}
