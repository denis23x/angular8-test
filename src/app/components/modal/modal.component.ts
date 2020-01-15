import { Component, OnInit } from '@angular/core';
import { EmitterService } from '../../services/emitter.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  active: boolean;
  type: string;
  data: object;

  constructor(
    private emitterService: EmitterService) { }

  ngOnInit() {
    this.emitterService.updateModal.subscribe(({ active, type, data }) => {
      this.active = active;
      this.type = type;
      this.data = data;
    });
  }

}
