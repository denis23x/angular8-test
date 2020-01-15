import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Priorities {
  constructor() { }

  public priorities = [];

  addPriorities(priorities) {
    this.priorities = priorities;
  }

  getPriorities() {
    return this.priorities;
  }
}
