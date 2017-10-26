import { Directive, forwardRef, Input, OnDestroy } from '@angular/core';
import { NG_ASYNC_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/distinctUntilChanged';



import { UniqueValidatorService } from './unique-validator.service';


@Directive({
  selector: '[appUniqueValidator][formControlName],[appUniqueValidator][ngModel]',
  providers:[{
    provide: NG_ASYNC_VALIDATORS,
    useExisting: forwardRef(() => UniqueValidatorsDirective),
    multi: true
  }]
})
export class UniqueValidatorsDirective implements Validator, OnDestroy {
  @Input() keyUrl : string ; // KeyUrl Input to pass in the backend
  @Input() keyId  : number ; // keyId input to determine the value to be update in the backend

  controlValue  = new Subject<any>();

  constructor(private _service : UniqueValidatorService) { }

  //validate method that will return an onbservable or promise
  validate( control : AbstractControl ) : Promise<[{[key : string] : any}]> | Observable<{[key : string] : any}> {

      // method that subscribe and check the value if unique or not and return an observable of null if not and return and observable of {key : value} if the value is unique          

      return this.validateUniqueValue(control).first();
     
  }

  validateUniqueValue(control : AbstractControl) {

      this.controlValue.next();

      return new Observable( (observer) => {

            control.valueChanges
                          .debounceTime(300)
                          .distinctUntilChanged()
                          .takeUntil(this.controlValue)
                          .switchMap( (value) =>  this._service.validateToBackEnd(this.keyUrl,value,this.keyId))
                          .subscribe( (result) => {
                            if(result.status == 200){
                              observer.next(null);
                            }
                            else{
                              observer.next({'asyncInvalid' : true});
                            }
                          },
                          (err) => { observer.next({'asyncInvalid' : true}); });
      });
   
        
  }

  ngOnDestroy(){
    this.controlValue.unsubscribe();
  }



}
