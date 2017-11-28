import { Projects } from "../../features/projects/models/projects.model";
import { Position } from "../../features/positions/models/positions.model";
import { EmploymentStatus } from "../../features/employment-status/models/employment-status.model";
import { EmployeeStatus } from "../../features/employee-status/models/employee-status.model";
import { Units } from "../../features/units/models/units.model";
import { Equipment } from "../../features/equipments/models/equipments.model";
import { CollectionSchedules } from "../../features/collection-schedules/models/collection-schedules.model";
import { CollectionTypes } from "../../features/collection-types/models/collection-types.model";




export interface ProjectResponse {
    status : number;
    data   : Projects[];
}
  
export interface PositionResponse {
    status : number;
    data   : Position[];
}
  
export interface EmploymentStatusResponse {
    status : number;
    data   : EmploymentStatus[];
}
  
export interface EmployeeStatusResponse {
    status : number;
    data   : EmployeeStatus[]
}

export interface UnitsResponse {
    status : number;
    data   : Units [];
}

export interface EquipmentResponse {
    status : number;
    data   : Equipment[];
}

export interface CollectionScheduleResponse {
    status : number;
    data   : CollectionSchedules[];
}

export interface CollectionTypeResponse {
    status  : number;
    data    : CollectionTypes[];
}
  