
import { Action } from '@ngrx/store';
import { Login, LoginResponse } from "./../models/login.model";

export const LOGIN_AUTHENTICATE              =   '[LOGIN] LoginAuthenticate';
export const LOGIN_SUCCESS                   =   '[LOGIN] LoginSuccess';
export const LOGIN_ERROR                     =   '[LOGIN] LoginError';
export const LOGOUT                          =   '[LOGIN] Logout';

export class LoginAuthenticate implements Action {
  readonly type = LOGIN_AUTHENTICATE;

  constructor(public payload: Login) { }
}

export class LoginSuccess implements Action {
    readonly type = LOGIN_SUCCESS;
  
    constructor(public payload: LoginResponse) { }
}

export class LoginError implements Action {
    readonly type = LOGIN_ERROR;

    constructor(public payload : any){}
}

export class Logout implements Action {
    readonly type = LOGOUT;

}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
= LoginAuthenticate
| LoginSuccess
| LoginError
| Logout;