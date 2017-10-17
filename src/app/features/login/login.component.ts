import { Component, OnInit } from '@angular/core';

import { Store } from "@ngrx/store";
import * as fromMain from './../../main-content/reducers/main-content.reducers';
import * as mainActions from './../../main-content/actions/main-content.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _store : Store<fromMain.State>) { }

  ngOnInit() {
  }


  loginPage() {
    this._store.dispatch( new mainActions.IsLoginPage(false) );
  }

}
