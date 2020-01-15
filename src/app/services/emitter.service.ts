import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmitterService {
  createSnack = new Subject();
  updateTaskList = new Subject();
}
