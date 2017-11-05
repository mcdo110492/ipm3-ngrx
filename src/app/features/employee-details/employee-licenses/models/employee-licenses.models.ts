

export interface EmployeeLicense {
    employeeLicenseId       :   number;
    employeeId              :   number;
    licenseNumber           :   string;
    licenseType             :   string;
    dateIssued              :   Date;
    dateExpiry              :   Date;
    created_at?             :   Date;
    updated_at?             :   Date;
}