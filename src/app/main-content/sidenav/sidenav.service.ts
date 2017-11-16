import { Injectable } from '@angular/core';

import { superAdminLinks, projectHrLinks, defaultLinks } from "./sidenav.metadata";
import { RouterLinks } from "./../models/router-links.model";

@Injectable()
export class SidenavService {

    /**
     * 
     * @param role 
     * Method that will determine what url links will be given to the current user
     */
    setLinksByRole(role : number) : RouterLinks[] {
        if(role == 1){
            return superAdminLinks;
        }
        else if(role == 2){
            return projectHrLinks;
        }
        else {
            return defaultLinks;
        }
    }
    
}