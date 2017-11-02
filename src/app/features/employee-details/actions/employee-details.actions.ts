import { Action } from '@ngrx/store';

export const GET_EMPLOYEE_ID                    =   '[EMPLOYEEDETAILS] GetEmployeeId';

export class GetEmployeeId implements Action {
  readonly type = GET_EMPLOYEE_ID;

  constructor(public payload: number) { }
}





/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
= GetEmployeeId;