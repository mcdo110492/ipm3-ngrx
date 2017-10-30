import { Injectable } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";
import { ToastsManager } from "ng2-toastr/ng2-toastr";

@Injectable()
export class ToastrService {

    constructor(private _toast : ToastsManager){}

    saveSuccess(){
        this._toast.success("Transaction has been saved.","Success");
    }

    error(){
        this._toast.error("There's an error occured while connecting to the server. Please Contact your administrator or refresh your browser","Error");
    }

    custom(title : string, message : string,type : string,){

        switch (type) {

            case "success" : {
                this._toast.success(message,title);
                break;
            }

            case "error" : {
                this._toast.error(message,title);
                break;
            }

            case "warning" : {
                this._toast.warning(message,title);
                break;
            }
                
            default: {
                this._toast.success(message,title);
                break;
            }
               
        }

    }

    errorHandler(err : HttpErrorResponse) {
        
        if(err instanceof Error){
        
            this._toast.error("There' s an error occured. Try to refresh your browser","Error");
              
        }
        else {
        
             // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            if(err.status == 500){

                this.error();

            }
            else if(err.status == 422){

                this._toast.warning("Your form cannot be processed. Make sure you meet the requirements","Unporcessed Form");
               
            }
            else{
                
                this.error();
            }
        }
            
        }

}
