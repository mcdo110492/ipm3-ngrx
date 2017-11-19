import { Projects } from "../../features/projects/models/projects.model";
import { Position } from "../../features/positions/models/positions.model";
import { EmploymentStatus } from "../../features/employment-status/models/employment-status.model";
import { EmployeeStatus } from "../../features/employee-status/models/employee-status.model";
import { Units } from "../../features/units/models/units.model";




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
  