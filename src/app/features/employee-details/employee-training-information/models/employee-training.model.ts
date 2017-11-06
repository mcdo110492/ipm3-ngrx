

export interface EmployeeTraining {

    employeeTrainingId          :   number;
    employeeId                  :   number;
    trainingName                :   string;
    trainingTitle               :   string;
    trainingFrom                :   Date;
    trainingTo                  :   Date;
    created_at?                 :   Date;
    updated_at?                 :   Date;


}