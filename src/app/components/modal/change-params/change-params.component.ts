import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Snack } from '../../../classes/snack';
import { ApiService } from '../../../services/api.service';
import { EmitterService } from '../../../services/emitter.service';

@Component({
  selector: 'app-change-params',
  templateUrl: './change-params.component.html',
  styleUrls: ['./change-params.component.scss']
})
export class ChangeParamsComponent implements OnInit, OnDestroy {
  @Input() task: object;
  @Input() paramName: string;
  @Input() params: Array<object>;

  title: string;

  constructor(
    private apiService: ApiService,
    private emitterService: EmitterService,
    private snack: Snack) { }

  ngOnInit() {
    if (this.paramName === 'executor') {
      this.title = 'Изменить исполнителя';
    } else if (this.paramName === 'status') {
      this.title = 'Изменить статус';
    }
  }

  ngOnDestroy() {
  }

  closeModal() {
    this.emitterService.updateModal.next(false);
  }

  updateParam(param) {
    let request = {};

    if (this.paramName === 'executor') {
      request = {
        id: this.task['id'],
        statusId: this.task['statusId'],
        executorId: param.id,
        executorName: param.name,
      };
    } else if (this.paramName === 'status') {
      request = {
        id: this.task['id'],
        executorId: this.task['executorId'],
        statusId: param.id,
        statusName: param.name,
        statusRgb: param.rgb,
      };
    }

    this.apiService.updateTask(request).subscribe(() => {
      this.closeModal();
      this.emitterService.updateTask.next();
      this.emitterService.updateTaskList.next();
      this.emitterService.createSnack.next(this.snack.taskSuccessUpdate);
    }, () => {
      this.emitterService.createSnack.next(this.snack.serverError);
    });
  }
}
