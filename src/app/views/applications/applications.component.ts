import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { EmitterService } from '../../services/emitter.service';
import { Snack } from '../../classes/snack';
import { Task } from '../../classes/task';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {

  tasksList = [];
  taskSearchValue = '';

  constructor(
    private apiService: ApiService,
    private emitterService: EmitterService) { }

  ngOnInit() {
    this.getTasks();
  }

  doSearch(str) {
    this.taskSearchValue = str.trim();
  }

  toggleCreate(toggle) {
    this.emitterService.createTask.next(toggle);
  }

  toggleEdit(toggle, task) {
    this.emitterService.editTask.next({
      toggle,
      task
    });
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
            t.statusRgb,
            t.statusName,
            t.initiatorName,
            t.executorName,
          ));
        });

        this.tasksList.reverse();
      },
      () => {
        this.emitterService.createSnack.next(new Snack('error', 'Произошла ошибка запроса, попробуйте позже..', 5000));
      });
  }

  submitCreate($event) {
    console.log($event);
    // this.apiService.postNewTask($event).subscribe(() => {
    //     this.getTasks();
    //     this.toggleCreate(false);
    //     this.emitterService.createSnack.next(new Snack('success', 'Заявка добавлена', 5000));
    //   },
    //   () => {
    //     this.emitterService.createSnack.next(new Snack('error', 'Произошла ошибка запроса, попробуйте позже..', 5000));
    //   });
  }

  submitEdit($event) {
    console.log('submitEdit', $event);
  }
}
