import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { EmitterService } from '../../services/emitter.service';
import { Task } from '../../classes/task';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @Output() submitEdit = new EventEmitter <any>();

  task: Task;
  active: boolean;

  constructor(
    private emitterService: EmitterService) { }

  ngOnInit() {
    this.emitterService.editTask.subscribe(({ toggle, task }) => {
      this.task = task;
      this.activeHandler(toggle);
    });
  }

  activeHandler(toggle) {
    this.active = toggle;
  }

  editApplication() {
    this.submitEdit.emit('aasdasd');
  }
}
