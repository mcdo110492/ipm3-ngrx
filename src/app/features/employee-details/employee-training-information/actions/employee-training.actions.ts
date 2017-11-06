import { Action } from '@ngrx/store';
import { EmployeeTraining } from "./../models/employee-training.model";

export const LOAD                                =   '[EMPLOYEETRAINING] Load';
export const LOAD_SUCCESS                        =   '[EMPLOYEETRAINING] LoadSuccess';
export const TRAINING_ERROR                      =   '[EMPLOYEETRAINING] TrainingError';
export const SELECTED_TRAINING                   =   '[EMPLOYEETRAINING] SelectedTraining';
export const CLEAR_SELECTED                      =   '[EMPLOYEETRAINING] ClearSelected';
export const SAVE_TRAINING                       =   '[EMPLOYEETRAINING] SaveTraining';
export const SAVE_TRAINING_SUCCESS               =   '[EMPLOYEETRAINING] SaveTrainingSuccess';


export class Load implements Action {
  readonly type = LOAD;

}

export class LoadSuccess implements Action {
    readonly type = LOAD_SUCCESS;
  
    constructor(public payload: EmployeeTraining[]) { }
}

export class TrainingError implements Action {
    readonly type = TRAINING_ERROR;

    constructor(public payload : any){}
}

export class SelectedTraining implements Action {
    readonly type = SELECTED_TRAINING;

    constructor(public payload : EmployeeTraining){}
}

export class ClearSelected implements Action {
    readonly type = CLEAR_SELECTED;
    
}

export class SaveTraining implements Action {
    readonly type = SAVE_TRAINING;

    constructor(public payload : EmployeeTraining){}
}

export class SaveTrainingSuccess implements Action {
    readonly type = SAVE_TRAINING_SUCCESS;

}





/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
= Load
| LoadSuccess
| TrainingError
| SelectedTraining
| ClearSelected
| SaveTraining
| SaveTrainingSuccess;