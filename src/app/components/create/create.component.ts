import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Snack } from '../../classes/snack';
import { EmitterService } from '../../services/emitter.service';

export class NewTask {
  constructor(public name?: string, public description?: string) { }
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  newTask: NewTask = new NewTask();

  constructor(
    private router: Router,
    private apiService: ApiService,
    private emitterService: EmitterService,
    private snack: Snack) { }

  ngOnInit() {
  }

  createTask() {
    this.apiService.postNewTask(this.newTask).subscribe((id) => {
        this.router.navigate(['/applications', id]);
        this.emitterService.updateTaskList.next();

        const snack = this.snack.taskSuccessUpdate;
        snack.message = 'Заявка создана';
        this.emitterService.createSnack.next(snack);
      }, () => {
        this.emitterService.createSnack.next(this.snack.serverError);
      });
  }
}
