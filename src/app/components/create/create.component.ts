import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Snack } from '../../classes/snack';
import { EmitterService } from '../../services/emitter.service';

export class NewTask {
  constructor(public name: string, public description: string) { }
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  newTask: NewTask = new NewTask('Имя заявки тест', 'Описание заявки тест');

  constructor(
    private router: Router,
    private apiService: ApiService,
    private emitterService: EmitterService) { }

  ngOnInit() {
  }

  createTask() {
    this.apiService.postNewTask(this.newTask).subscribe(() => {
        this.emitterService.createSnack.next(new Snack('success', 'Заявка добавлена', 5000));
        this.emitterService.updateTaskList.next();
      }, () => {
        this.emitterService.createSnack.next(new Snack('error', 'Произошла ошибка запроса, попробуйте позже..', 5000));
      });
  }
}
