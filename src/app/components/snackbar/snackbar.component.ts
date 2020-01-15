import { Component, OnInit } from '@angular/core';
import { EmitterService } from '../../services/emitter.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  type: string;
  message: string;
  active: boolean;

  constructor(
    private emitterService: EmitterService) { }

  ngOnInit() {
    this.emitterService.createSnack.subscribe(({type, message, delay}) => {
      this.type = type;
      this.message = message;
      this.active = true;

      const x = setTimeout(() => {
        this.active = false;
        clearTimeout(x);
      }, delay);
    });
  }

}
