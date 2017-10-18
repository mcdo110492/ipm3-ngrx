import { Component, OnInit } from '@angular/core';

import { Store } from "@ngrx/store";
import * as fromMain from './../../main-content/reducers/main-content.reducers';
import * as mainActions from './../../main-content/actions/main-content.actions';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoginPage : Observable<boolean>;
  constructor(private _store : Store<fromMain.State>) { 
    this.isLoginPage = this._store.select(fromMain.getIsLoginPage);
  }

  ngOnInit() {
  }


  loginPage() {
    this._store.dispatch( new mainActions.IsLoginPage(false) );
  }

}
