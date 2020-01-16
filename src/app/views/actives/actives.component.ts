import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actives',
  templateUrl: './actives.component.html',
})
export class ActivesComponent implements OnInit {

  title = '';

  constructor(
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.title = this.route.snapshot.data['title'];
  }

}
