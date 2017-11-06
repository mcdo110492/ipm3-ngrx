import { Action } from '@ngrx/store';
import { EmployeeClub } from "./../models/employee-club.model";

export const LOAD                                =   '[EMPLOYEECLUB] Load';
export const LOAD_SUCCESS                        =   '[EMPLOYEECLUB] LoadSuccess';
export const CLUB_ERROR                          =   '[EMPLOYEECLUB] ClubError';
export const SELECTED_CLUB                       =   '[EMPLOYEECLUB] SelectedClub';
export const CLEAR_SELECTED                      =   '[EMPLOYEECLUB] ClearSelected';
export const SAVE_CLUB                           =   '[EMPLOYEECLUB] SaveClub';
export const SAVE_CLUB_SUCCESS                   =   '[EMPLOYEECLUB] SaveClubSuccess';


export class Load implements Action {
  readonly type = LOAD;

}

export class LoadSuccess implements Action {
    readonly type = LOAD_SUCCESS;
  
    constructor(public payload: EmployeeClub[]) { }
}

export class ClubError implements Action {
    readonly type = CLUB_ERROR;

    constructor(public payload : any){}
}

export class SelectedClub implements Action {
    readonly type = SELECTED_CLUB;

    constructor(public payload : EmployeeClub){}
}

export class ClearSelected implements Action {
    readonly type = CLEAR_SELECTED;
    
}

export class SaveClub implements Action {
    readonly type = SAVE_CLUB;

    constructor(public payload : EmployeeClub){}
}

export class SaveClubSuccess implements Action {
    readonly type = SAVE_CLUB_SUCCESS;

}





/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
= Load
| LoadSuccess
| ClubError
| SelectedClub
| ClearSelected
| SaveClub
| SaveClubSuccess;