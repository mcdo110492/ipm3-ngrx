

export interface EmployeeEducational {

    employeeEducationId             :   number;
    employeeId                      :   number;
    schoolName                      :   string;
    schoolAddress                   :   string;
    schoolYear                      :   string;
    degree                          :   string;
    major                           :   string;
    minor                           :   string;
    awards                          :   string;
    created_at?                     :   Date;
    updated_at?                     :   Date;

}