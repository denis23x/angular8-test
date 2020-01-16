import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Snack } from '../../classes/snack';
import { EmitterService } from '../../services/emitter.service';
import { Users } from '../../classes/users';
import { Statuses } from '../../classes/statuses';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {

  task: object;
  commentText: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private emitterService: EmitterService,
    private users: Users,
    private statuses: Statuses,
    private snack: Snack) { }

  ngOnInit() {
    this.route.paramMap.subscribe(()  =>  {
      this.getTask();
    });

    this.emitterService.updateTask.subscribe(() => {
      this.getTask();
    });
  }

  ngOnDestroy() {
  }

  getTask() {
    this.apiService.getTaskById(this.route.snapshot.paramMap.get('id')).subscribe(response => {
      this.task = response;
    }, () => {
      this.emitterService.createSnack.next(this.snack.serverError);
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

    this.emitterService.updateModal.next({
      active: true,
      component: 'change-params',
      data,
    });
  }

  addComment() {
    this.apiService.updateTask({
      id: this.task['id'],
      statusId: this.task['statusId'],
      executorId: this.task['executorId'],
      comment: this.commentText,
    }).subscribe(() => {
      this.getTask();

      const snack = this.snack.taskSuccessUpdate;
      snack.message = 'Комментарий добавлен';
      this.emitterService.createSnack.next(snack);
    }, () => {
      this.emitterService.createSnack.next(this.snack.serverError);
    });
  }
}
