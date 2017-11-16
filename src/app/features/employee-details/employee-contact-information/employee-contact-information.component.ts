import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { Store } from "@ngrx/store";
import * as contactActions from "./actions/employee-contact.actions";
import * as fromRoot from "./../reducers";

import { Observable } from 'rxjs/Observable';
import { take } from "rxjs/operators";

import { EmployeeContact } from "./models/employee-contact.model";

@Component({
  selector: 'app-employee-contact-information',
  templateUrl: './employee-contact-information.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeContactInformationComponent implements OnInit {

  contactForm      : FormGroup;
  contactData      : Observable<EmployeeContact>;

  constructor(private _fb : FormBuilder,
              private _store : Store<fromRoot.State>) { 

    this.createForm();

    this.contactData = this._store.select(fromRoot.getContact);

  }

  ngOnInit() {

    this._store.dispatch( new contactActions.GetContact() );
   
    this.contactData
    .pipe(
      take(2)
    )
    .subscribe((data : EmployeeContact) => {
      if(data !== undefined){
        this.contactForm.patchValue(data)
      }
      
    });

  }

  createForm() : void {

    this.contactForm = this._fb.group({
      employeeContactId     : [null,Validators.required],
      presentAddress        : [null,[Validators.required, Validators.maxLength(150)]],
      provincialAddress     : [null,[Validators.required, Validators.maxLength(150)]],
      mobileNumber          : [null,[Validators.required, Validators.maxLength(50)]],
      telephoneNumber       : [null,[Validators.required, Validators.maxLength(50)]]
    });

  }

  save(){
    this._store.dispatch( new contactActions.SaveContact(this.contactForm.value) );
  }


}
