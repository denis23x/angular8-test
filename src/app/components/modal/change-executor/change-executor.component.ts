import {Component, Input, OnInit} from '@angular/core';
import { Snack } from '../../../classes/snack';
import { ApiService } from '../../../services/api.service';
import { EmitterService } from '../../../services/emitter.service';
import { Modal } from '../../../classes/modal';

@Component({
  selector: 'app-change-executor',
  templateUrl: './change-executor.component.html',
  styleUrls: ['./change-executor.component.scss']
})
export class ChangeExecutorComponent implements OnInit {
  @Input() task: object;

  users: Array<object> = [];

  constructor(
    private apiService: ApiService,
    private emitterService: EmitterService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.apiService.getUsersList().subscribe(response => {
      this.users = response;
    }, () => {
      this.emitterService.createSnack.next(new Snack('error', 'Произошла ошибка запроса, попробуйте позже..', 5000));
    });
  }

  closeModal() {
    this.emitterService.updateModal.next(new Modal(false));
  }

  setExecutor(user) {
    this.apiService.updateTask({
      id: this.task['id'],
      statusId: this.task['statusId'],
      executorId: user.id,
      executorName: user.name,
    }).subscribe(() => {
      this.closeModal();
      this.emitterService.updateTask.next();
      this.emitterService.updateTaskList.next();
      this.emitterService.createSnack.next(new Snack('success', 'Заявка обновлена', 5000));
    }, () => {
      this.emitterService.createSnack.next(new Snack('error', 'Произошла ошибка запроса, попробуйте позже..', 5000));
    });
  }
}
