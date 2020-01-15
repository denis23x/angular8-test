import { Component } from '@angular/core';
import { Router, ActivationStart } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private router: Router,
    private titleService: Title) {

    this.router.events.subscribe(event => {
      if (event instanceof ActivationStart) {
        const newTitle = event.snapshot.data['title'] || '';
        this.titleService.setTitle(newTitle.length ? `IntraVision - ${newTitle}` : 'IntraVision');
      }
    });
  }
}
