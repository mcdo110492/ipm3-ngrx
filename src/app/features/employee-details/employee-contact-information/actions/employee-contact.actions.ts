import { Action } from '@ngrx/store';
import { EmployeeContact } from "./../models/employee-contact.model";

export const GET_CONTACT                   =   '[EMPLOYEECONTACT] GetContact';
export const GET_CONTACT_SUCCESS           =   '[EMPLOYEECONTACT] GetContactSuccess';
export const GET_CONTACT_ERROR             =   '[EMPLOYEECONTACT] GetContactError';
export const SAVE_CONTACT                  =   '[EMPLOYEECONTACT] SaveContact';
export const SAVE_CONTACT_SUCCESS          =   '[EMPLOYEECONTACT] SaveContactSuccess';

export class GetContact implements Action {
  readonly type = GET_CONTACT;
}

export class GetContactSuccess implements Action {
    readonly type = GET_CONTACT_SUCCESS;
  
    constructor(public payload: EmployeeContact) { }
}

export class GetContactError implements Action {
    readonly type = GET_CONTACT_ERROR;

    constructor(public payload : any){}
}

export class SaveContact implements Action {
    readonly type = SAVE_CONTACT;

    constructor(public payload : EmployeeContact){}
}

export class SaveContactSuccess implements Action {
    readonly type = SAVE_CONTACT_SUCCESS;
    
    constructor(public payload : EmployeeContact){}
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
= GetContact
| GetContactSuccess
| GetContactError
| SaveContact
| SaveContactSuccess;