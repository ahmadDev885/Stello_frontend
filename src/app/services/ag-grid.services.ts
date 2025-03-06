import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AgGridService {
  updateRows$: Subject<object[]> = new Subject();

  constructor() {
  }

  // function for emiting updated rows data
  updateRows(data:any): void {
    this.updateRows$.next(data);
  }
}
