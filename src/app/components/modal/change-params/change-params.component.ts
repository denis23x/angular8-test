import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Snack } from '../../../classes/snack';
import { ApiService } from '../../../services/api.service';
import { EmitterService } from '../../../services/emitter.service';
import { Modal } from '../../../classes/modal';

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
    private emitterService: EmitterService) { }

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
    this.emitterService.updateModal.next(new Modal(false));
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
      this.emitterService.createSnack.next(new Snack('success', 'Заявка обновлена', 5000));
    }, () => {
      this.emitterService.createSnack.next(new Snack('error', 'Произошла ошибка запроса, попробуйте позже..', 5000));
    });
  }
}
