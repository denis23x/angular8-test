import { Component, OnInit } from '@angular/core';
import { Task } from '../../classes/task';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Snack } from '../../classes/snack';
import { EmitterService } from '../../services/emitter.service';
import { Modal } from '../../classes/modal';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  task: Task;
  commentText: string;
  comments: Array<object> = [];
  users: Array<object> = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private emitterService: EmitterService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap  =>  {
      this.comments = [];
      this.getTask();
    });

    this.emitterService.updateTask.subscribe(() => {
      this.getTask();
    });
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
        r.executorName,
      );
    }, () => {
      this.emitterService.createSnack.next(new Snack('error', 'Произошла ошибка запроса, попробуйте позже..', 5000));
    });
  }

  getUsers() {
    this.apiService.getUsersList().subscribe(response => {
      this.users = response;
    }, () => {
      this.emitterService.createSnack.next(new Snack('error', 'Произошла ошибка запроса, попробуйте позже..', 5000));
    });
  }

  changeExecutor() {
    this.emitterService.updateModal.next(new Modal(true, 'change-executor', this.task));
  }

  changePriority() {
    this.emitterService.updateModal.next(new Modal(true, 'change-priority', this.task));
  }

  addComment() {
    this.comments.push({
      authorName: this.users[Math.floor(Math.random() * 3)]['name'],
      createdAt: new Date(),
      commentText: this.commentText,
    });

    this.commentText = '';
  }
}
