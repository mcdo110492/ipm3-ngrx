
import { Action } from '@ngrx/store';
import { Shifts } from "./../models/shifts.model";

export const LOAD                                 =   '[SHIFTS] Load';
export const IS_LOADING                           =   '[SHIFTS] IsLoading';
export const LOAD_SUCCESS                         =   '[SHIFTS] LoadSuccess';
export const LOAD_ERROR                           =   '[SHIFTS] LoadError';
export const SEARCH                               =   '[SHIFTS] Search';
export const PAGINATE                             =   '[SHIFTS] Paginate';
export const SORT                                 =   '[SHIFTS] Sort';
export const SELECT_SHIFTS                        =   '[SHIFTS] SelectShifts';
export const CLEAR_SELECT_SHIFTS                  =   '[SHIFTS] ClearSelectShifts';
export const CREATE_SHIFTS                        =   '[SHIFTS] CreateShifts';
export const SAVE_SHIFTS                          =   '[SHIFTS] SaveShifts';
export const SAVE_SUCCESS                         =   '[SHIFTS] SaveSuccess';
export const UPDATE_SUCCESS                       =   '[SHIFTS] UpdateSuccess';
export const CHANGE_STATUS                        =   '[SHIFTS] ChangeStatus';


export class Load implements Action {
  readonly type = LOAD;

}

export class IsLoading implements Action {
    readonly type = IS_LOADING;

    constructor(public payload : boolean){}
}

export class LoadSuccess implements Action {
    readonly type = LOAD_SUCCESS;
  
    constructor(public payload: Shifts[], public count : number) { }
}

export class LoadError implements Action {
    readonly type = LOAD_ERROR;

    constructor(public payload : any){}
}

export class Search implements Action {
    readonly type = SEARCH;

    constructor(public payload : string){}
}

export class Paginate implements Action {
    readonly type = PAGINATE;

    constructor(public pageSize : number, public pageIndex : number ){}
}

export class Sort implements Action {
    readonly type = SORT;

    constructor(public sortField : string, public sortDirection : string){}
}

export class SelectShifts implements Action {
    readonly type = SELECT_SHIFTS;

    constructor(public payload : Shifts){}
}

export class ClearSelectShifts implements Action {
    readonly type = CLEAR_SELECT_SHIFTS;
}

export class CreateShifts implements Action {
    readonly type = CREATE_SHIFTS;
}

export class SaveShifts implements Action {
    readonly type = SAVE_SHIFTS;

    constructor(public payload : Shifts){}
}


export class SaveSuccess implements Action {
    readonly type = SAVE_SUCCESS;

    constructor(public payload : any){}
}

export class UpdateSuccess implements Action {
    readonly type = UPDATE_SUCCESS;
    
    constructor(public payload : { id : number, updatedData : Shifts }){}
}

export class ChangeStatus implements Action {
    readonly type = CHANGE_STATUS;

    constructor(public payload: { id: number, status : number }){}
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
= Load
| IsLoading
| LoadSuccess
| LoadError
| Search
| Paginate
| Sort
| SelectShifts
| ClearSelectShifts
| CreateShifts
| SaveShifts
| SaveSuccess
| UpdateSuccess
| ChangeStatus;