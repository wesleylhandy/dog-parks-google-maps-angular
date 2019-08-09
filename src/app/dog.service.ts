import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DogService {

  dogNumber: Number = 0;

  updateNum(num: Number) {
    this.dogNumber = num;
  }

  getNumber(): Observable<Number> {
    return of(this.dogNumber)
  }

  constructor() { }
}
