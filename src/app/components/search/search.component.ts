import { Component, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output() getSearch = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  inputSearch(search: string) {
    this.getSearch.emit(search);
  }
}
