import { Directive, forwardRef, Input, OnDestroy } from '@angular/core';
import { NG_ASYNC_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { first, switchMap, debounceTime, takeUntil, distinctUntilChanged } from "rxjs/operators";

import { UniqueValidatorService } from './unique-validator.service';

@Directive({
  selector: '[appUniqueValidators][formControlName],[appUniqueValidators][ngModel]',
  providers:[{
    provide: NG_ASYNC_VALIDATORS,
    useExisting: forwardRef(() => UniqueValidatorsDirective),
    multi: true
  }]
})
export class UniqueValidatorsDirective implements Validator, OnDestroy {
  @Input() keyUrl : string ; // KeyUrl Input to pass in the backend
  @Input() keyId  : number ; // keyId input to determine the id value to be update in the backend
  @Input() keyField : string ; //keyField input to determine the field to be compare. optional

  controlValue  = new Subject<any>();

  constructor(private _service : UniqueValidatorService) { }

  //validate method that will return an onbservable or promise
  validate( control : AbstractControl ) : Promise<[{[key : string] : any}]> | Observable<{[key : string] : any}> {

      // method that subscribe and check the value if unique or not and return an observable of null if the value is not currently in use and return and observable of {key : value} if the value is already used          

      return this.validateUniqueValue(control)
      .pipe(
        first()
      );
     
  }

  //Method to subscribe in the unique-validator.service
  validateUniqueValue(control : AbstractControl) {

      this.controlValue.next(); // This is use to get if the next value of the control is emitted to avoid excessive call of validation 

      return new Observable( (observer) => {
            control.valueChanges
            .pipe(
              debounceTime(300),
              distinctUntilChanged(),
              takeUntil(this.controlValue),
              switchMap( (value) =>  this._service.validateToBackEnd(this.keyUrl,value,this.keyId,this.keyField) )
            )
            .subscribe( (result) => {
                if(result.status == 200){
                    //return status of 200
                    observer.next(null);
                }
                else{
                  observer.next({'asyncInvalid' : true}); 
                }
              },
              (err) => { 
                //return status of 422 or 500
                observer.next({'asyncInvalid' : true}); 
              });
      });
   
        
  }

  ngOnDestroy(){
    //Unsubscribe to the Subject subscription to avoid memory leaks
    this.controlValue.unsubscribe();
  }



}
