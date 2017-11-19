
export interface Equipment {
    equipmentId     :   number;
    equipmentCode   :   string;
    bodyNumber      :   string;
    model           :   string;
    capacity        :   string;
    plateNo         :   string;
    remarks?        :   string;
    status?         :   number;
    unitId          :   number;
    unitCode?       :   string;
    unitName?       :   string;
    projectId?      :   number;
    created_at?     :   Date;
    updated_at?     :   Date;
}