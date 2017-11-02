

export interface EmployeePersonal {
    employeeId          :   number;
    employeeNumber      :   string;
    firstName           :   string;
    middleName          :   string;
    lastName            :   string;
    birthday            :   Date;
    placeOfBirth        :   string;
    civilStatus         :   string;
    citizenship         :   string;
    religion            :   string;
    created_at?         :   Date;
    updated_at?         :   Date;
}