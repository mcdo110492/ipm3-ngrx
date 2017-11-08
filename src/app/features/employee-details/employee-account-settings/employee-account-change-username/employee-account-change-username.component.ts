import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


@Component({
  selector: 'app-employee-account-change-username',
  templateUrl: './employee-account-change-username.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeAccountChangeUsernameComponent implements OnInit, OnChanges {

  @Input() username : string;
  @Input() accountId : number;
  @Output() save    : EventEmitter<string> = new EventEmitter<string>();

  usernameForm : FormGroup;

  constructor(private _fb : FormBuilder) {

    this.createForm();
  }

  ngOnInit() {
  }

  ngOnChanges(){

    this.usernameForm.setValue({
      username             : this.username
    });

  }



  createForm() {

      this.usernameForm = this._fb.group({
        username             : [null,Validators.required]
      });

  }

  submit(){
    
    this.save.emit(this.usernameForm.get('username').value);

  }

}
