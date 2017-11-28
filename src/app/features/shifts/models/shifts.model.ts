

export interface Shifts {
    shiftId                 :   number;
    equipmentId             :   number;
    bodyNumber?             :   string;
    collectionScheduleId    :   number;
    collectionScheduleName? :   string;
    collectionTypeId        :   number;
    collectionTypeName?     :   string;
    geofenceName            :   string;
    sectors                 :   string;
    shiftTime               :   Date;
    routeFile?              :   string;
    projectId               :   number;
    created_at?             :   Date;
    updated_at?             :   Date;   
}