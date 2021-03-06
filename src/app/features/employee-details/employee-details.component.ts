import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import {  MatTabChangeEvent } from "@angular/material";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { switchMap, take } from "rxjs/operators";

import * as empActions from './actions/employee-details.actions';
import * as personalActions from './employee-personal-information/actions/employee-personal.actions';
import * as fromRoot    from './reducers';

import { EmployeePersonal } from "./employee-personal-information/models/employee-personal.models";
import { EmployeeDetailsService } from "./employee-details.service";

import { fadeAnimation } from "./../../animations/fade.animations";

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
  animations:[fadeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeDetailsComponent implements OnInit {

  personalInfo : Observable<EmployeePersonal>;
  currentIndex : number = 0;
  constructor(private _store : Store<fromRoot.State>,
              private _route : ActivatedRoute,
              private _router : Router,
              private _service : EmployeeDetailsService ) { 
  
    this.personalInfo = this._store.select(fromRoot.getPersonal);

  }

  ngOnInit() {

    this._route.paramMap
    .pipe(
      switchMap((params : ParamMap) => { return of(+params.get('id')) }),
      take(1)
    )
    .subscribe((id) => this._store.dispatch(new empActions.GetEmployeeId(id)) );

    this.checkRouteTabSelected();

    this._store.dispatch( new personalActions.GetPersonal() );
    
  }


  //Listen to tab change to navigate
  tabChange(ev : MatTabChangeEvent){
    const index = ev.index;
    if(index == 0){
      this._router.navigate(['personal'],{ relativeTo: this._route });
    }
    else if(index == 1){
      this._router.navigate(['employment'],{ relativeTo: this._route });
    }
    else if(index == 2){
      this._router.navigate(['contact'], { relativeTo : this._route });
    }
    else if(index == 3){
      this._router.navigate(['government'], { relativeTo : this._route });
    }
    else if(index == 4){
      this._router.navigate(['health'], { relativeTo : this._route });
    }
    else if(index == 5){
      this._router.navigate(['license'], { relativeTo : this._route });
    }
    else if(index == 6){
      this._router.navigate(['educational'], { relativeTo : this._route });
    }
    else if(index == 7){
      this._router.navigate(['training'], { relativeTo : this._route });
    }
    else if(index == 8){
      this._router.navigate(['club'], { relativeTo : this._route });
    }
    else if(index == 9){
      this._router.navigate(['account/setting'], { relativeTo : this._route });
    }

  }

  //Check the current route and select the label in the data of the route and change the selectedIndex of the mat-tab on page reload
  checkRouteTabSelected(){

    this._route.firstChild.data
    .pipe(
      take(1)
    )
    .subscribe((data) => {

     this.currentIndex = this._service.selectedRouteTab(data);
        
    });

  }


  /**
   * This for animating every routes with a data 'animation'
   * @param outlet 
   */
  prepRouteState(outlet : any){
    return outlet.isActivated ? outlet.activatedRoute : '';
    //return outlet.activatedRouteData.animation;
  }


}
