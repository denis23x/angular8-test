import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Users {
  constructor() { }

  public users = [];

  addUsers(users) {
    this.users = users;
  }

  getUsers() {
    return this.users;
  }
}
