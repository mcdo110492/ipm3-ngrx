

export interface EmployeeRegister {
    personal    :   Personal;
    employment  :   Employment;
}


export interface Personal {
    employeeNumber      :   string;
    firstName           :   string;
    middleName          :   string;
    lastName            :   string;
    birthday            :   Date;
    placeOfBirth        :   string;
    civilStatus         :   string;
    citizenship         :   string;
    religion            :   string;
}

export interface Employment {
    positionId          :   number;
    employeeStatusId     :   number;
    employmentStatusId  :   number;
    contractStart       :   Date;
    contractEnd         :   Date;
}