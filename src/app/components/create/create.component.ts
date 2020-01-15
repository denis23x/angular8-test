import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { EmitterService } from '../../services/emitter.service';

export class Application {
  name: string;
  description: string;
  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  @Output() submitCreate = new EventEmitter <Application>();

  application: Application = new Application('Имя заявки тест', 'Описание заявки тест');
  active: boolean;

  constructor(
    private emitterService: EmitterService) { }

  ngOnInit() {
    this.emitterService.createTask.subscribe((toggle) => {
      this.activeHandler(toggle);
    });
  }

  activeHandler(toggle) {
    this.active = toggle;
  }

  createApplication() {
    this.submitCreate.emit(new Application(this.application.name, this.application.description));
  }
}
