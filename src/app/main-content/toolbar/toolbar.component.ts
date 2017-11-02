import { Component } from '@angular/core';
import { Router } from "@angular/router";

import { Observable } from 'rxjs/Observable';
import { Store } from "@ngrx/store";
import * as mainActions from './../actions/main-content.actions';
import * as fromMain from './../reducers/main-content.reducers';

import * as loginActions from "./../../features/login/actions/login.actions";
import * as fromLogin from './../../features/login/reducers/login.reducers';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  profileName   : Observable<string>;
  profileImage  : Observable<string>;
  constructor(private _mainStore : Store<fromMain.State>, private _loginStore : Store<fromLogin.State> , private _router : Router) {
    this.profileName  = this._loginStore.select(fromLogin.getProfileName);
    this.profileImage = this._loginStore.select(fromLogin.getProfileImage);
  }

  toggleSidenav(){
    this._mainStore.dispatch( new mainActions.SidenavToggle() );
  }

  logout() {
    this._loginStore.dispatch( new loginActions.Logout() );
    this._mainStore.dispatch( new mainActions.IsLoginPage(true) );
    this._router.navigateByUrl('login');
  }

}
