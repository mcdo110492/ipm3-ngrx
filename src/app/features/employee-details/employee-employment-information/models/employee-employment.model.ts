

export interface EmployeeEmployment {
    employeeEmploymentId        :   number;
    employeeId                  :   number;
    positionId                  :   number;
    employeeStatusId            :   number;
    employmentStatusId          :   number;
    contractStart               :   Date | string;
    contractEnd                 :   Date | string;
    salary                      :   number;
    remarks                     :   string;
    created_at?                 :   Date;
    updated_at?                 :   Date;
}