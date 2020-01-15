import { Component, OnInit } from '@angular/core';
import { Task } from '../../classes/task';
import { Router, ActivatedRoute, ActivationEnd } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Snack } from '../../classes/snack';
import { EmitterService } from '../../services/emitter.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  task: Task;
  comments: Array<any> = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private emitterService: EmitterService) { }

  ngOnInit() {
    this.getTask();

    this.router.events.subscribe(event => {
      if (event instanceof ActivationEnd) {
        this.getTask();
      }
    });
  }

  getTask() {
    this.apiService.postTaskById(this.route.snapshot.paramMap.get('id')).subscribe(r => {
      this.task = new Task(
        r.id,
        r.name,
        r.description,
        r.createdAt,
        r.resolutionDatePlan,
        r.priorityName,
        r.tags,
        r.statusRgb,
        r.statusName,
        r.initiatorName,
        r.executorName,
      );
    }, () => {
      this.emitterService.createSnack.next(new Snack('error', 'Произошла ошибка запроса, попробуйте позже..', 5000));
    });
  }

  addComment() {
    this.comments.push({
      authorName: 'Vasya',
      createdAt: new Date(),
      commentText: '<div class="created">{{comment.createdAt | date:\'dd.MM.yyyy\'}}</div> <div class="created">{{comment.createdAt | date:\'dd.MM.yyyy\'}}</div> <div class="created">{{comment.createdAt | date:\'dd.MM.yyyy\'}}</div> <div class="created">{{comment.createdAt | date:\'dd.MM.yyyy\'}}</div>'
    });

    console.log(this.comments);
  }
}
