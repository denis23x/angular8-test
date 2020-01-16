import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { EmitterService } from '../../services/emitter.service';
import { Snack } from '../../classes/snack';
import { Router } from '@angular/router';
import { Users } from '../../classes/users';
import { Statuses } from '../../classes/statuses';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {

  tasksList: Array<object> = [];
  taskSearchValue: string;

  constructor(
    private apiService: ApiService,
    private emitterService: EmitterService,
    private router: Router,
    private users: Users,
    private statuses: Statuses,
    private snack: Snack) { }

  ngOnInit() {
    this.getTasks();
    this.getUsers();
    this.getStatuses();

    this.emitterService.updateTaskList.subscribe(() => {
      this.getTasks();
    });
  }

  getSearch(str) {
    this.taskSearchValue = str.trim();
  }

  getTasks() {
    this.apiService.getTasksList().subscribe(response => {
        this.tasksList = response.value;
        this.tasksList.reverse();
      }, () => {
        this.emitterService.createSnack.next(this.snack.serverError);
      });
  }

  getUsers() {
    this.apiService.getUsersList().subscribe(response => {
      this.users.addUsers(response);
      }, () => {
        this.emitterService.createSnack.next(this.snack.serverError);
      });
  }

  getStatuses() {
    this.apiService.getStatusesList().subscribe(response => {
      this.statuses.addStatuses(response);
    }, () => {
      this.emitterService.createSnack.next(this.snack.serverError);
    });
  }
}
