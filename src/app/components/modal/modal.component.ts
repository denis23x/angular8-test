import { Component, OnInit } from '@angular/core';
import { EmitterService } from '../../services/emitter.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  active: boolean;
  component: string;
  data: object;

  constructor(
    private emitterService: EmitterService) { }

  ngOnInit() {
    this.emitterService.updateModal.subscribe(({ active, component, data }) => {
      this.active = active;
      this.component = this.active ? component : '';
      this.data = this.active ? data : {};
    });
  }

}
