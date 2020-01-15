import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Statuses {
  constructor() { }

  public statuses = [];

  addStatuses(statuses) {
    this.statuses = statuses;
  }

  getStatuses() {
    return this.statuses;
  }
}
