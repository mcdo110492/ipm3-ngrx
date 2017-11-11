import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { Store } from "@ngrx/store";
import * as fromMain from './../../main-content/reducers/main-content.reducers';

import { Observable } from 'rxjs/Observable';
import { Subscription } from "rxjs/Subscription";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';

import * as loginActions from "./actions/login.actions";
import * as fromLogin from './reducers/login.reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  subscription : Subscription;
  isLoginPage : Observable<boolean>;
  loginForm   : FormGroup;
  loginRole   : Observable<number>;

  constructor(private _mainStore : Store<fromMain.State>, private _loginStore : Store<fromLogin.State>, private _fb : FormBuilder, private _router : Router) { 

    this.isLoginPage = this._mainStore.select(fromMain.getIsLoginPage);
    this.loginRole   = this._loginStore.select(fromLogin.getRole);
    this.createForm();

  }


  ngOnInit() {

   this.subscription = this.loginRole.subscribe((role) => {
      if(role == 1){
        this._router.navigateByUrl('/projects');
      }
      else if(role == 2 ){
        this._router.navigateByUrl('/employee/list');
      }
    });

  }


  authenticate() {

    this._loginStore.dispatch( new loginActions.LoginAuthenticate(this.loginForm.value) );

  }

  createForm(){
    this.loginForm = this._fb.group({
      username      : [null,Validators.required],
      password      : [null,Validators.required]
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
