
import { Action } from '@ngrx/store';
import { Element, PageSettings, SortSettings } from "./../models/material-table.model";

export const SEARCH                 =   '[ MATTABLE ] Search';
export const SEARCH_COMPLETE        =   '[ MATTABLE ] SearchComplete';
export const SEARCH_ERROR           =   '[ MATTABLE ] SearchError';
export const LOAD_ELEMENTS          =   '[ MATTABLE ] LoadElements';
export const LOAD_ELEMENTS_SUCCESS  =   '[ MATTABLE ] LoadElementSuccess';
export const SELECTED_ELEMENT       =   '[ MATTABLE ] SelectedElement';
export const PAGINATE               =   '[ MATTABLE ] Paginate';
export const SORT                   =   '[ MATTABLE ] Sort';

export class Search implements Action {
  readonly type = SEARCH;

  constructor(public payload: string) { }
}

export class SearchComplete implements Action {
    readonly type = SEARCH_COMPLETE;
  
    constructor(public payload: Element[]) { }
}

export class SearchError implements Action {
    readonly type = SEARCH_ERROR;

    constructor(public payload : any){}
}

export class LoadElements implements Action {
    readonly type = LOAD_ELEMENTS;
}

export class LoadElementSuccess implements Action {
    readonly type = LOAD_ELEMENTS_SUCCESS;

    constructor(public payload : Element[]){}
}

export class SelectedElement implements Action {
     readonly type = SELECTED_ELEMENT;

     constructor(public payload : number){}
}

export class Paginate implements Action {
    readonly type = PAGINATE;

    constructor(public payload : PageSettings){}
}

export class Sort implements Action {
    readonly type = SORT;

    constructor(public payload : SortSettings){}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
= Search
| SearchComplete
| SearchError
| LoadElements
| LoadElementSuccess
| SelectedElement
| Paginate
| Sort;