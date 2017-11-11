import { Injectable } from '@angular/core';

import * as moment from 'moment';

@Injectable()
export class MomentService {

  // Parse the date to moment before passing in to the server in order to avoid passing an incorrect date
  parseDateToMoment(date : Date | string){
    moment.locale();
    return moment(date).format('LL');
  }

}
