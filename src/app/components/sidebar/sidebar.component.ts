import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  sidebarList = [];

  constructor(
    private router: Router) { }

  ngOnInit() {
    this.sidebarList = this.router.config.slice(1).map(r => {
      return {
        icon: r.data.icon,
        title: r.data.title,
        path: r.path
      };
    });
  }

}
