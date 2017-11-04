import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { Store } from "@ngrx/store";
import * as contactActions from "./actions/employee-contact.actions";
import * as fromRoot from "./../reducers";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toArray';

import { EmployeeContact } from "./models/employee-contact.model";

@Component({
  selector: 'app-employee-contact-information',
  templateUrl: './employee-contact-information.component.html',
  styleUrls: ['./employee-contact-information.component.scss'],
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
    .take(2)
    .subscribe((data : EmployeeContact) => {
      if(data !== undefined){
        this.contactForm.patchValue(data)
      }
      
    });

  }

  createForm() : void {

    this.contactForm = this._fb.group({
      employeeContactId     : [null,Validators.required],
      presentAddress        : [null,Validators.required],
      provincialAddress     : [null,Validators.required],
      mobileNumber          : [null,Validators.required],
      telephoneNumber       : [null,Validators.required]
    });

  }

  save(){
    this._store.dispatch( new contactActions.SaveContact(this.contactForm.value) );
  }


}
