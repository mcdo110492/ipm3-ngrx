import { Injectable } from '@angular/core';

@Injectable()
export class EmployeeDetailsService {

  constructor() { }
  
  //Get the label of the data 
  selectedRouteTab(data : any) : number {

    const label = data.label;
    
      if(label === 'personal'){
          return 0;
      }
      else if(label === 'employment'){
          return 1;
      }
      else if(label === 'contact'){
         return 2;
      }
      else if(label === 'government'){
          return 3;
      }
      else if(label === 'health'){
          return 4;
      }
      else if(label === 'license'){
          return 5;
      }
      else if(label === 'educational'){
          return 6;
      }
      else if(label === 'training'){
          return 7;
      }
      else if(label === 'club'){
        return 8;
      }
      else if(label === 'account'){
        return 9;
      }

  }
  

}
