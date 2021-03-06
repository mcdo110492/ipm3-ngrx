
import { RouterLinks } from "./../models/router-links.model";

// A Collection of links per user role

export const defaultLinks : RouterLinks[] = [
    { title : '404 NOT FOUND', isHeader: true }
];

export const superAdminLinks : RouterLinks[]  = [
    { title : 'Master Data' , isHeader : true},
    { title : 'Projects' , link : 'projects', icon : 'table', isHeader : false },
    { title : 'Positions' , link : 'positions', icon : 'table', isHeader : false },
    { title : 'Employment Status' , link : 'employment/status', icon : 'table', isHeader : false },
    { title : 'Employee Status' , link : 'employee/status', icon : 'table', isHeader : false },
    // { title : 'Units' , link : 'units', icon : 'table', isHeader : false },
    // { title : 'Collection Schedules' , link : 'collection/schedules', icon : 'table', isHeader : false },
    // { title : 'Collection Types' , link : 'collection/types', icon : 'table', isHeader : false },
    { title : 'Human Resources' , isHeader : true},
    { title : 'Register Employee' , link : 'employee/register', icon : 'book', isHeader : false },
    { title : 'Employee List' , link : 'employee/list', icon : 'people', isHeader : false },
    // { title : 'Equipments' , isHeader : true},
    // { title : 'Equipments' , link : 'equipments', icon : 'directions_bus', isHeader : false },
    // { title : 'GPS' , isHeader : true},
    // { title : 'Shifts' , link : 'shifts', icon : 'place', isHeader : false },
];



export const projectHrLinks : RouterLinks[] = [
    { title : 'Master Data' , isHeader : true},
    { title : 'Positions' , link : 'positions', icon : 'table', isHeader : false },
    { title : 'Employment Status' , link : 'employment/status', icon : 'table', isHeader : false },
    { title : 'Employee Status' , link : 'employee/status', icon : 'table', isHeader : false },
    { title : 'Human Resources' , isHeader : true},
    { title : 'Register Employee' , link : 'employee/register', icon : 'book', isHeader : false },
    { title : 'Employee List' , link : 'employee/list', icon : 'people', isHeader : false }
];
