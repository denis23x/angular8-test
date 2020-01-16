import { Component, OnInit, OnDestroy } from '@angular/core';
import { Task } from '../../classes/task';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Snack } from '../../classes/snack';
import { EmitterService } from '../../services/emitter.service';
import { Modal } from '../../classes/modal';
import { Users } from '../../classes/users';
import { Statuses } from '../../classes/statuses';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {

  task: Task;
  commentText: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private emitterService: EmitterService,
    private users: Users,
    private statuses: Statuses) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap  =>  {
      this.getTask();
    });

    this.emitterService.updateTask.subscribe(() => {
      this.getTask();
    });
  }

  ngOnDestroy() {
  }

  getTask() {
    this.apiService.getTaskById(this.route.snapshot.paramMap.get('id')).subscribe(r => {
      this.task = new Task(
        r.id,
        r.name,
        r.description,
        r.createdAt,
        r.resolutionDatePlan,
        r.priorityName,
        r.tags,
        r.statusId,
        r.statusRgb,
        r.statusName,
        r.initiatorName,
        r.executorId,
        r.executorName,
        r.lifetimeItems,
      );
    }, () => {
      this.emitterService.createSnack.next(new Snack('error', 'Произошла ошибка запроса, попробуйте позже..', 5000));
    });
  }

  changeParams(param) {
    const data = {
      task: this.task,
      paramName: param,
      params: {},
    };

    if (param === 'executor') {
      data.params = this.users.getUsers();
    } else if (param === 'status') {
      data.params = this.statuses.getStatuses();
    }

    this.emitterService.updateModal.next(new Modal(true, 'change-params', data));
  }

  addComment() {
    this.apiService.updateTask({
      id: this.task['id'],
      statusId: this.task['statusId'],
      executorId: this.task['executorId'],
      comment: this.commentText,
    }).subscribe(() => {
      this.getTask();
    }, () => {
      this.emitterService.createSnack.next(new Snack('error', 'Произошла ошибка запроса, попробуйте позже..', 5000));
    });
  }
}
