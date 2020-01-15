import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Output() clicked = new EventEmitter();
  @Input() label: string;
  @Input() disabled: boolean;

  constructor() { }

  ngOnInit() {
  }

  click() {
    this.clicked.emit();
  }
}
