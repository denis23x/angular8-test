import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
})
export class ClientsComponent implements OnInit {

  title = '';

  constructor(
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.title = this.route.snapshot.data['title'];
  }

}
