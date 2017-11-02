import { Injectable } from '@angular/core';

import * as moment from 'moment';

@Injectable()
export class MomentService {

  constructor() { }

  parseDateToMoment(date : Date){
    moment.locale();
    return moment(date).format('LL');
  }

}
