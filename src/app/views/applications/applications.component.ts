import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { EmitterService } from '../../services/emitter.service';
import { Snack } from '../../classes/snack';
import { Task } from '../../classes/task';
import { Router } from '@angular/router';
import { Users } from '../../classes/users';
import { Statuses } from '../../classes/statuses';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {

  tasksList: Array<Task> = [];
  taskSearchValue: string;

  constructor(
    private apiService: ApiService,
    private emitterService: EmitterService,
    private router: Router,
    private users: Users,
    private statuses: Statuses) { }

  ngOnInit() {
    this.getTasks();
    this.getUsers();
    this.getStatuses();

    this.emitterService.updateTaskList.subscribe(() => {
      this.getTasks();
    });
  }

  doSearch(str) {
    this.taskSearchValue = str.trim();
  }

  getTasks() {
    this.apiService.getTasksList().subscribe(response => {
        response.value.forEach(t => {
          this.tasksList.push(new Task(
            t.id,
            t.name,
            t.description,
            t.createdAt,
            t.resolutionDatePlan,
            t.priorityName,
            t.tags,
            t.statusId,
            t.statusRgb,
            t.statusName,
            t.initiatorName,
            t.executorId,
            t.executorName,
            t.lifetimeItems,
          ));
        });

        this.tasksList.reverse();
      }, () => {
        this.emitterService.createSnack.next(new Snack('error', 'Произошла ошибка запроса, попробуйте позже..', 5000));
      });
  }

  getUsers() {
    this.apiService.getUsersList().subscribe(response => {
      this.users.addUsers(response);
      }, () => {
        this.emitterService.createSnack.next(new Snack('error', 'Произошла ошибка запроса, попробуйте позже..', 5000));
      });
  }

  getStatuses() {
    this.apiService.getStatusesList().subscribe(response => {
      this.statuses.addStatuses(response);
    }, () => {
      this.emitterService.createSnack.next(new Snack('error', 'Произошла ошибка запроса, попробуйте позже..', 5000));
    });
  }
}
