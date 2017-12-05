

export interface EmployeeEmployment {
    employeeEmploymentId        :   number;
    employeeId                  :   number;
    positionId                  :   number;
    employeeStatusId            :   number;
    employmentStatusId          :   number;
    dateHired                   :   Date | string;
    contractStart               :   Date | string;
    contractEnd                 :   Date | string;
    salary                      :   number;
    remarks                     :   string;
    created_at?                 :   Date;
    updated_at?                 :   Date;
}